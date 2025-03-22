// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PaymasterAgreement} from "../src/core/PaymasterAgreement.sol";
import {ServiceAgreement} from "../src/core/ServiceAgreement.sol";

contract ServiceAgreementTest is Test {
    PaymasterAgreement public paymaster;
    ServiceAgreement public serviceAgreement;
    address public client;
    address public serviceProvider;

    function setUp() public {
        // Setup accounts
        client = makeAddr("client");
        serviceProvider = makeAddr("serviceProvider");
        vm.deal(client, 100 ether);

        // Deploy contracts
        paymaster = new PaymasterAgreement(100000);
        serviceAgreement = new ServiceAgreement(address(paymaster));
    }

    function testCreateAgreement() public {
        // Prepare milestone data
        string[] memory descriptions = new string[](2);
        descriptions[0] = "First milestone";
        descriptions[1] = "Second milestone";

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        uint256[] memory deadlines = new uint256[](2);
        deadlines[0] = block.timestamp + 1 days;
        deadlines[1] = block.timestamp + 2 days;

        // Create agreement
        vm.prank(client);
        serviceAgreement.createAgreement{value: 3 ether}(
            serviceProvider,
            "ipfs://terms",
            descriptions,
            amounts,
            deadlines
        );

        // Verify agreement creation
        (
            address agrClient,
            address agrServiceProvider,
            uint256 totalAmount,
            ServiceAgreement.Status status,
            string memory termsHash,
            uint256 completedMilestones,
            uint256 createdAt
        ) = serviceAgreement.getAgreement(0);

        assertEq(agrClient, client);
        assertEq(agrServiceProvider, serviceProvider);
        assertEq(totalAmount, 3 ether);
        assertEq(uint256(status), uint256(ServiceAgreement.Status.Created));
        assertEq(termsHash, "ipfs://terms");
        assertEq(completedMilestones, 0);
        assertTrue(createdAt > 0);
    }

    function testCompleteMilestone() public {
        // First create an agreement
        testCreateAgreement();

        // Complete first milestone
        uint256[] memory milestoneIndices = new uint256[](1);
        milestoneIndices[0] = 0;

        uint256 providerBalanceBefore = serviceProvider.balance;

        vm.prank(client);
        serviceAgreement.completeBatchMilestones(0, milestoneIndices);

        // Verify milestone completion
        (
            string memory description,
            uint256 amount,
            bool completed,
            uint256 deadline
        ) = serviceAgreement.getMilestone(0, 0);
        assertTrue(completed);

        // Verify payment
        assertEq(serviceProvider.balance - providerBalanceBefore, 1 ether);
    }
}
