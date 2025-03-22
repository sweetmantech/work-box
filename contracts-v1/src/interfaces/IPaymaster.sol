// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPaymaster {
    struct Transaction {
        uint256 gasLimit;
        bytes paymasterInput;
    }

    struct ExecutionResult {
        bool success;
        uint256 gasUsed;
    }

    function validateAndPayForPaymasterTransaction(
        Transaction calldata _transaction
    ) external payable returns (bytes4 magic, bytes memory context);

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        ExecutionResult calldata _txResult,
        uint256 _maxRefundedGas
    ) external;
}
