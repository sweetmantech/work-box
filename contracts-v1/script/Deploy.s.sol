// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {PaymasterAgreement} from "../src/core/PaymasterAgreement.sol";
import {ServiceAgreement} from "../src/core/ServiceAgreement.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy PaymasterAgreement with minimum gas requirement
        PaymasterAgreement paymaster = new PaymasterAgreement(100000); // Adjust gas requirement as needed

        // Deploy ServiceAgreement with paymaster address
        ServiceAgreement serviceAgreement = new ServiceAgreement(
            address(paymaster)
        );

        vm.stopBroadcast();

        console.log("PaymasterAgreement deployed at:", address(paymaster));
        console.log("ServiceAgreement deployed at:", address(serviceAgreement));
    }
}
