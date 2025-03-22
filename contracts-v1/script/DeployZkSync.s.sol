// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {PaymasterAgreement} from "../src/core/PaymasterAgreement.sol";
import {ServiceAgreement} from "../src/core/ServiceAgreement.sol";

contract DeployZkSync is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts to zkSync Era...");
        console.log("Deployer address:", deployerAddress);

        // Deploy the implementation
        vm.startBroadcast(deployerPrivateKey);

        // Deploy PaymasterAgreement with minimum gas requirement
        console.log("Deploying PaymasterAgreement...");
        PaymasterAgreement paymaster = new PaymasterAgreement(100000);

        console.log("PaymasterAgreement deployed at:", address(paymaster));

        // Deploy ServiceAgreement with paymaster address
        console.log("Deploying ServiceAgreement...");
        ServiceAgreement serviceAgreement = new ServiceAgreement(
            address(paymaster)
        );

        console.log("ServiceAgreement deployed at:", address(serviceAgreement));

        vm.stopBroadcast();

        console.log("Deployment completed!");

        // Print deployment details for use in frontend or verification
        console.log("==== Contract Addresses ====");
        console.log("PaymasterAgreement:", address(paymaster));
        console.log("ServiceAgreement:", address(serviceAgreement));
    }
}
