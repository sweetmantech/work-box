// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/PaymasterAgreement.sol";
import "../core/ServiceAgreement.sol";

/**
 * @title AgreementFactory
 * @dev Factory contract to deploy PaymasterAgreement and ServiceAgreement contracts
 * This streamlines the deployment process on zkSync Era and allows for deterministic addresses
 */
contract AgreementFactory {
    // Events
    event PaymasterDeployed(
        address indexed paymaster,
        uint256 minGasToComplete
    );
    event ServiceAgreementDeployed(
        address indexed serviceAgreement,
        address indexed paymaster
    );
    event AgreementPairDeployed(
        address indexed paymaster,
        address indexed serviceAgreement,
        uint256 minGasToComplete
    );

    // Storage for deployed contracts
    mapping(address => bool) public isPaymasterDeployed;
    mapping(address => bool) public isServiceAgreementDeployed;
    address[] public deployedPaymasters;
    address[] public deployedServiceAgreements;

    /**
     * @dev Deploy a new PaymasterAgreement contract
     * @param minGasToComplete Minimum gas required for transactions
     * @return paymaster Address of the deployed PaymasterAgreement
     */
    function deployPaymaster(
        uint256 minGasToComplete
    ) public returns (address paymaster) {
        paymaster = address(new PaymasterAgreement(minGasToComplete));

        deployedPaymasters.push(paymaster);
        isPaymasterDeployed[paymaster] = true;

        emit PaymasterDeployed(paymaster, minGasToComplete);
        return paymaster;
    }

    /**
     * @dev Deploy a new ServiceAgreement contract
     * @param paymaster Address of the PaymasterAgreement to use
     * @return serviceAgreement Address of the deployed ServiceAgreement
     */
    function deployServiceAgreement(
        address paymaster
    ) public returns (address serviceAgreement) {
        require(
            paymaster != address(0),
            "PaymasterAgreement address cannot be zero"
        );

        serviceAgreement = address(new ServiceAgreement(paymaster));

        deployedServiceAgreements.push(serviceAgreement);
        isServiceAgreementDeployed[serviceAgreement] = true;

        emit ServiceAgreementDeployed(serviceAgreement, paymaster);
        return serviceAgreement;
    }

    /**
     * @dev Deploy both PaymasterAgreement and ServiceAgreement contracts in one transaction
     * @param minGasToComplete Minimum gas required for transactions
     * @return paymaster Address of the deployed PaymasterAgreement
     * @return serviceAgreement Address of the deployed ServiceAgreement
     */
    function deployAgreementPair(
        uint256 minGasToComplete
    ) public returns (address paymaster, address serviceAgreement) {
        paymaster = deployPaymaster(minGasToComplete);
        serviceAgreement = deployServiceAgreement(paymaster);

        emit AgreementPairDeployed(
            paymaster,
            serviceAgreement,
            minGasToComplete
        );
        return (paymaster, serviceAgreement);
    }

    /**
     * @dev Get the number of deployed PaymasterAgreement contracts
     * @return count Number of deployed PaymasterAgreement contracts
     */
    function getDeployedPaymastersCount() public view returns (uint256) {
        return deployedPaymasters.length;
    }

    /**
     * @dev Get the number of deployed ServiceAgreement contracts
     * @return count Number of deployed ServiceAgreement contracts
     */
    function getDeployedServiceAgreementsCount() public view returns (uint256) {
        return deployedServiceAgreements.length;
    }

    /**
     * @dev Get all deployed PaymasterAgreement addresses
     * @return Array of all deployed PaymasterAgreement addresses
     */
    function getAllDeployedPaymasters() public view returns (address[] memory) {
        return deployedPaymasters;
    }

    /**
     * @dev Get all deployed ServiceAgreement addresses
     * @return Array of all deployed ServiceAgreement addresses
     */
    function getAllDeployedServiceAgreements()
        public
        view
        returns (address[] memory)
    {
        return deployedServiceAgreements;
    }
}
