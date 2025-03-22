# zkSync Era Contract Verification Scripts

This directory contains scripts to help you verify your deployed contracts on the zkSync Era network using Foundry.

## Prerequisites

1. Install Foundry:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. Make sure Foundry is correctly set up for zkSync Era verification.

3. Add your API key to the `.env` file in the parent directory (optional but recommended):
   ```
   ZKSYNC_VERIFY_API_KEY=your_api_key_here
   ```

## Available Scripts

### 1. Basic Verification Script (`verify.sh`)

This script verifies both contracts (PaymasterAgreement and ServiceAgreement) with the default parameters.

Usage:

```bash
./verify.sh <paymaster_address> <service_agreement_address>
```

Example:

```bash
./verify.sh 0x1234...abcd 0x5678...efgh
```

### 2. Advanced Verification Script (`verify-advanced.sh`)

This script provides more flexibility, allowing you to specify network, compiler version, and constructor arguments.

Usage:

```bash
./verify-advanced.sh [OPTIONS]
```

Options:

- `-p, --paymaster ADDRESS`: PaymasterAgreement contract address
- `-s, --service ADDRESS`: ServiceAgreement contract address
- `-n, --network NETWORK`: Network (sepolia, mainnet) [default: sepolia]
- `-c, --chain-id ID`: Chain ID [default: 300 for sepolia]
- `-v, --compiler VERSION`: Solidity compiler version [default: 0.8.20]
- `-g, --min-gas VALUE`: Minimum gas requirement for PaymasterAgreement [default: 100000]
- `-w, --no-watch`: Don't watch for verification status
- `-h, --help`: Show this help message

Example:

```bash
./verify-advanced.sh -p 0x1234...abcd -s 0x5678...efgh -n mainnet
```

## Make Scripts Executable

Before using these scripts, make them executable:

```bash
chmod +x verify.sh verify-advanced.sh
```

## How Verification Works

These scripts will:

1. Encode the constructor arguments correctly for each contract.
2. Submit the verification request to the zkSync Era verifier API.
3. Watch for verification completion if the `--watch` flag is enabled.
4. Provide links to check the verification status on the zkSync Era Explorer.

## Verifying Contracts Manually

If you prefer to verify contracts manually, you can use the following commands:

For PaymasterAgreement:

```bash
forge verify-contract \
    --chain-id 300 \
    --compiler-version 0.8.20 \
    --constructor-args $(cast abi-encode "constructor(uint256)" 100000) \
    --verifier-url "https://explorer.sepolia.era.zksync.dev/contract_verification" \
    --watch \
    <PAYMASTER_ADDRESS> \
    src/core/PaymasterAgreement.sol:PaymasterAgreement
```

For ServiceAgreement:

```bash
forge verify-contract \
    --chain-id 300 \
    --compiler-version 0.8.20 \
    --constructor-args $(cast abi-encode "constructor(address)" <PAYMASTER_ADDRESS>) \
    --verifier-url "https://explorer.sepolia.era.zksync.dev/contract_verification" \
    --watch \
    <SERVICE_AGREEMENT_ADDRESS> \
    src/core/ServiceAgreement.sol:ServiceAgreement
```

## Troubleshooting

1. **Missing API Key**: While not strictly required, an API key may help with rate limiting.

2. **Verification Errors**: Check that:

   - The constructor arguments match exactly how the contract was deployed.
   - You're using the same compiler version as during deployment.
   - The contract addresses are correct.

3. **Cannot Find Contract**: Make sure the contract is actually deployed to the network you're verifying on.

4. **Connection Issues**: Check that the verifier URL is correct for the network you're verifying on.

## More Information

For more detailed information, see the zkSync documentation on contract verification:
https://foundry-book.zksync.io/forge/deploying?highlight=--verify#verifying-a-pre-existing-contract
