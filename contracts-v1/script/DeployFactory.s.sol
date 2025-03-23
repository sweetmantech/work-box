// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AgreementFactory} from "../src/factories/AgreementFactory.sol";

/**
 * @title DeployFactory
 * @dev Deploy the AgreementFactory contract to zkSync Era
 */
contract DeployFactory is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Deploying AgreementFactory to zkSync Era...");
        console.log("Deployer address:", deployerAddress);

        // Deploy the AgreementFactory contract
        vm.startBroadcast(deployerPrivateKey);

        AgreementFactory factory = new AgreementFactory();

        vm.stopBroadcast();

        console.log("AgreementFactory deployed at:", address(factory));
        console.log("Deployment completed!");
    }
}
