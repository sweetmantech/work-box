// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IPaymaster.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ServiceAgreement is ReentrancyGuard {
    enum Status {
        Created,
        Ongoing,
        Completed,
        Disputed,
        Cancelled
    }

    struct Milestone {
        string description;
        uint256 amount;
        bool completed;
        uint256 deadline;
    }

    struct Agreement {
        address client;
        address serviceProvider;
        uint256 totalAmount;
        Status status;
        string termsHash; // IPFS hash of agreement terms
        Milestone[] milestones;
        uint256 completedMilestones;
        uint256 createdAt;
    }

    mapping(uint256 => Agreement) public agreements;
    uint256 public nextAgreementId;

    // Events
    event AgreementCreated(
        uint256 id,
        address client,
        address serviceProvider,
        uint256 totalAmount
    );
    event MilestoneCompleted(uint256 agreementId, uint256 milestoneIndex);
    event AgreementDisputed(uint256 agreementId, address initiator);
    event AgreementCompleted(uint256 agreementId);
    event FundsReleased(uint256 agreementId, address to, uint256 amount);
    event BatchMilestonesCompleted(
        uint256 agreementId,
        uint256[] milestoneIndices
    );

    modifier onlyParties(uint256 _agreementId) {
        require(
            msg.sender == agreements[_agreementId].client ||
                msg.sender == agreements[_agreementId].serviceProvider,
            "Only agreement parties can call this"
        );
        _;
    }

    // State variables
    IPaymaster public paymaster;

    constructor(address _paymaster) {
        paymaster = IPaymaster(_paymaster);
    }

    function createAgreement(
        address serviceProvider,
        string calldata termsHash,
        string[] calldata milestoneDescriptions,
        uint256[] calldata milestoneAmounts,
        uint256[] calldata milestoneDealines
    ) external payable {
        require(
            serviceProvider != address(0),
            "Invalid service provider address"
        );
        require(
            milestoneDescriptions.length > 0,
            "Must have at least one milestone"
        );
        require(
            milestoneDescriptions.length == milestoneAmounts.length &&
                milestoneAmounts.length == milestoneDealines.length,
            "Milestone arrays length mismatch"
        );

        uint256 totalAmount = 0;
        Agreement storage newAgreement = agreements[nextAgreementId];
        newAgreement.client = msg.sender;
        newAgreement.serviceProvider = serviceProvider;
        newAgreement.status = Status.Created;
        newAgreement.termsHash = termsHash;
        newAgreement.createdAt = block.timestamp;
        newAgreement.completedMilestones = 0;

        // Initialize milestones array
        for (uint256 i = 0; i < milestoneDescriptions.length; i++) {
            require(
                milestoneAmounts[i] > 0,
                "Milestone amount must be greater than 0"
            );
            require(
                milestoneDealines[i] > block.timestamp,
                "Deadline must be in the future"
            );

            totalAmount += milestoneAmounts[i];
            newAgreement.milestones.push(
                Milestone({
                    description: milestoneDescriptions[i],
                    amount: milestoneAmounts[i],
                    completed: false,
                    deadline: milestoneDealines[i]
                })
            );
        }

        require(msg.value == totalAmount, "Incorrect payment amount");
        newAgreement.totalAmount = totalAmount;

        emit AgreementCreated(
            nextAgreementId,
            msg.sender,
            serviceProvider,
            totalAmount
        );
        nextAgreementId++;
    }

    function completeBatchMilestones(
        uint256 _agreementId,
        uint256[] calldata _milestoneIndices
    ) external nonReentrant {
        Agreement storage agreement = agreements[_agreementId];
        require(
            msg.sender == agreement.client,
            "Only client can complete milestones"
        );
        require(
            agreement.status == Status.Created ||
                agreement.status == Status.Ongoing,
            "Invalid agreement status"
        );

        uint256 totalAmount = 0;

        for (uint256 i = 0; i < _milestoneIndices.length; i++) {
            uint256 index = _milestoneIndices[i];
            require(
                index < agreement.milestones.length,
                "Invalid milestone index"
            );
            require(
                !agreement.milestones[index].completed,
                "Milestone already completed"
            );
            require(
                block.timestamp <= agreement.milestones[index].deadline,
                "Milestone deadline passed"
            );

            agreement.milestones[index].completed = true;
            agreement.completedMilestones++;
            totalAmount += agreement.milestones[index].amount;
        }

        // Transfer ETH to service provider
        (bool success, ) = agreement.serviceProvider.call{value: totalAmount}(
            ""
        );
        require(success, "Failed to send funds");

        emit BatchMilestonesCompleted(_agreementId, _milestoneIndices);
        emit FundsReleased(
            _agreementId,
            agreement.serviceProvider,
            totalAmount
        );

        if (agreement.completedMilestones == agreement.milestones.length) {
            agreement.status = Status.Completed;
            emit AgreementCompleted(_agreementId);
        }
    }

    function initiateDispute(
        uint256 _agreementId
    ) external onlyParties(_agreementId) {
        Agreement storage agreement = agreements[_agreementId];
        require(
            agreement.status != Status.Completed,
            "Agreement already completed"
        );
        require(
            agreement.status != Status.Disputed,
            "Dispute already initiated"
        );

        agreement.status = Status.Disputed;
        emit AgreementDisputed(_agreementId, msg.sender);
    }

    function getAgreement(
        uint256 _agreementId
    )
        external
        view
        returns (
            address client,
            address serviceProvider,
            uint256 totalAmount,
            Status status,
            string memory termsHash,
            uint256 completedMilestones,
            uint256 createdAt
        )
    {
        Agreement storage agreement = agreements[_agreementId];
        return (
            agreement.client,
            agreement.serviceProvider,
            agreement.totalAmount,
            agreement.status,
            agreement.termsHash,
            agreement.completedMilestones,
            agreement.createdAt
        );
    }

    function getMilestone(
        uint256 _agreementId,
        uint256 _milestoneIndex
    )
        external
        view
        returns (
            string memory description,
            uint256 amount,
            bool completed,
            uint256 deadline
        )
    {
        Agreement storage agreement = agreements[_agreementId];
        require(
            _milestoneIndex < agreement.milestones.length,
            "Invalid milestone index"
        );
        Milestone storage milestone = agreement.milestones[_milestoneIndex];
        return (
            milestone.description,
            milestone.amount,
            milestone.completed,
            milestone.deadline
        );
    }
}
