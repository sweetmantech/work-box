# Service Agreement Smart Contracts

This project contains smart contracts for managing service agreements between clients and service providers on zkSync Era. It uses native ETH for payments and includes security features like reentrancy protection and proper access control.

## Features

- Milestone-based payments
- Secure ETH handling
- Dispute resolution system
- Gas optimization through zkSync integration
- Batch milestone completion
- Deadline enforcement

## Project Structure

```
contracts-v1/
├── src/
│   ├── core/
│   │   ├── ServiceAgreement.sol
│   │   └── PaymasterAgreement.sol
│   ├── interfaces/
│   └── test/
├── script/
│   └── Deploy.s.sol
└── test/
    └── ServiceAgreement.t.sol
```

## Setup

1. Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install dependencies:

```bash
forge install
```

3. Create a `.env` file with your configuration:

```bash
PRIVATE_KEY=your_private_key
ZKSYNC_TESTNET_URL=your_zksync_testnet_url
ZKSYNC_MAINNET_URL=your_zksync_mainnet_url
```

## Testing

Run the tests:

```bash
forge test
```

## Deployment

1. Set up your environment variables in `.env`

2. Deploy to zkSync testnet:

```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url $ZKSYNC_TESTNET_URL --broadcast
```

## Usage

1. Deploy the contracts
2. Create a service agreement with milestones
3. Complete milestones and release payments
4. Handle disputes if they arise

## Security Features

- ReentrancyGuard for all external functions
- Proper access control
- Input validation
- Deadline enforcement
- Safe ETH handling
- Event emission for tracking
