// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AgreementFactory} from "../src/factories/AgreementFactory.sol";
import {PaymasterAgreement} from "../src/core/PaymasterAgreement.sol";
import {ServiceAgreement} from "../src/core/ServiceAgreement.sol";

/**
 * @title DeployFactoryWithContracts
 * @dev Deploy the AgreementFactory and use it to deploy contracts on zkSync Era
 */
contract DeployFactoryWithContracts is Script {
    // Minimum gas required for transactions through the PaymasterAgreement
    uint256 constant MIN_GAS_TO_COMPLETE = 100000;

    // Salt values for deterministic deployments
    bytes32 constant PAYMASTER_SALT = keccak256("PAYMASTER_V1");
    bytes32 constant SERVICE_SALT = keccak256("SERVICE_AGREEMENT_V1");

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log(
            "Deploying the AgreementFactory and contracts to zkSync Era..."
        );
        console.log("Deployer address:", deployerAddress);

        vm.startBroadcast(deployerPrivateKey);

        // Step 1: Deploy the factory
        console.log("1. Deploying AgreementFactory...");
        AgreementFactory factory = new AgreementFactory();
        console.log("   AgreementFactory deployed at:", address(factory));

        // Step 2: Use the factory to deploy a PaymasterAgreement
        console.log("\n2. Deploying PaymasterAgreement using factory...");
        address paymaster = factory.deployPaymaster(MIN_GAS_TO_COMPLETE);
        console.log("   PaymasterAgreement deployed at:", paymaster);

        // Step 3: Use the factory to deploy a ServiceAgreement linked to the PaymasterAgreement
        console.log("\n3. Deploying ServiceAgreement using factory...");
        address serviceAgreement = factory.deployServiceAgreement(paymaster);
        console.log("   ServiceAgreement deployed at:", serviceAgreement);

        // Step 4: Deploy another pair using the combined method
        console.log(
            "\n4. Deploying a pair of contracts using factory's combined method..."
        );
        (address paymaster2, address serviceAgreement2) = factory
            .deployAgreementPair(MIN_GAS_TO_COMPLETE);
        console.log("   PaymasterAgreement #2 deployed at:", paymaster2);
        console.log("   ServiceAgreement #2 deployed at:", serviceAgreement2);

        // Step 5: Deploy with deterministic addresses
        console.log(
            "\n5. Deploying contracts with deterministic addresses (CREATE2)..."
        );

        // First, predict the addresses that will be generated
        address predictedPaymaster = factory.predictPaymasterAddress(
            PAYMASTER_SALT,
            MIN_GAS_TO_COMPLETE
        );
        console.log(
            "   Predicted PaymasterAgreement address:",
            predictedPaymaster
        );

        address predictedService = factory.predictServiceAgreementAddress(
            SERVICE_SALT,
            predictedPaymaster
        );
        console.log("   Predicted ServiceAgreement address:", predictedService);

        // Now deploy at the predicted addresses
        (address deterministicPaymaster, address deterministicService) = factory
            .deployAgreementPairDeterministic(
                PAYMASTER_SALT,
                SERVICE_SALT,
                MIN_GAS_TO_COMPLETE
            );

        console.log(
            "   Deployed PaymasterAgreement at:",
            deterministicPaymaster
        );
        console.log("   Deployed ServiceAgreement at:", deterministicService);

        // Verify the predictions matched the actual deployment addresses
        require(
            deterministicPaymaster == predictedPaymaster,
            "Paymaster address prediction failed"
        );
        require(
            deterministicService == predictedService,
            "ServiceAgreement address prediction failed"
        );
        console.log(" Address predictions verified successfully!");

        vm.stopBroadcast();

        // Step 6: Get deployment summary
        console.log("\n6. Deployment Summary:");
        console.log("   AgreementFactory:", address(factory));
        console.log("   Standard Deployment:");
        console.log("   - PaymasterAgreement #1:", paymaster);
        console.log("   - ServiceAgreement #1:", serviceAgreement);
        console.log("   Pair Deployment:");
        console.log("   - PaymasterAgreement #2:", paymaster2);
        console.log("   - ServiceAgreement #2:", serviceAgreement2);
        console.log("   Deterministic Deployment:");
        console.log("   - PaymasterAgreement #3:", deterministicPaymaster);
        console.log("   - ServiceAgreement #3:", deterministicService);

        // Save deployment information to a file
        saveDeploymentInfo(
            address(factory),
            paymaster,
            serviceAgreement,
            paymaster2,
            serviceAgreement2,
            deterministicPaymaster,
            deterministicService
        );

        console.log("\nDeployment completed successfully!");
    }

    function saveDeploymentInfo(
        address factory,
        address paymaster1,
        address serviceAgreement1,
        address paymaster2,
        address serviceAgreement2,
        address paymaster3,
        address serviceAgreement3
    ) internal {
        // Create deployment-artifacts directory if it doesn't exist
        vm.createDir("./deployment-artifacts", true);

        // Format the deployment information as a JSON string
        string memory deploymentInfo = string(
            abi.encodePacked(
                "{\n",
                '  "factory": "',
                vm.toString(factory),
                '",\n',
                '  "standardDeployment": {\n',
                '    "paymaster": "',
                vm.toString(paymaster1),
                '",\n',
                '    "serviceAgreement": "',
                vm.toString(serviceAgreement1),
                '"\n',
                "  },\n",
                '  "pairDeployment": {\n',
                '    "paymaster": "',
                vm.toString(paymaster2),
                '",\n',
                '    "serviceAgreement": "',
                vm.toString(serviceAgreement2),
                '"\n',
                "  },\n",
                '  "deterministicDeployment": {\n',
                '    "paymaster": "',
                vm.toString(paymaster3),
                '",\n',
                '    "serviceAgreement": "',
                vm.toString(serviceAgreement3),
                '"\n',
                "  },\n",
                '  "deploymentTimestamp": "',
                vm.toString(block.timestamp),
                '"\n',
                "}"
            )
        );

        // Write the deployment information to a file
        vm.writeFile(
            "./deployment-artifacts/factory-deployment-info.json",
            deploymentInfo
        );
        console.log(
            "   Deployment details saved to ./deployment-artifacts/factory-deployment-info.json"
        );
    }
}
