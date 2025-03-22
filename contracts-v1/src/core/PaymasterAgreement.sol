// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IPaymaster.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymasterAgreement is IPaymaster, Ownable {
    // Magic value returned by the paymaster if validation is successful
    bytes4 constant PAYMASTER_VALIDATION_SUCCESS_MAGIC = 0x777777f2;

    // System contract addresses
    address constant BOOTLOADER_FORMAL_ADDRESS =
        address(0x0000000000000000000000000000000000000001);

    uint256 public minGasToComplete;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        _;
    }

    constructor(uint256 _minGasToComplete) Ownable(msg.sender) {
        minGasToComplete = _minGasToComplete;
    }

    function validateAndPayForPaymasterTransaction(
        Transaction calldata _transaction
    )
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory context)
    {
        // Ensure enough gas for the transaction
        require(
            _transaction.gasLimit >= minGasToComplete,
            "Not enough gas provided"
        );

        // Ensure transaction has enough ETH
        require(msg.value > 0, "Must provide ETH for transaction");

        // Return success magic value
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
        context = "";
    }

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        ExecutionResult calldata _txResult,
        uint256 _maxRefundedGas
    ) external onlyBootloader {}

    function withdraw(address payable _to, uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to withdraw");
    }

    receive() external payable {}
}
