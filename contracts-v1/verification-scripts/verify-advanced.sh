#!/bin/bash

# Advanced verification script for zkSync Era contracts with more options
# Based on https://foundry-book.zksync.io/forge/deploying?highlight=--verify#verifying-a-pre-existing-contract

# Exit script if any command fails
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default values
NETWORK="sepolia"
CHAIN_ID=300 # zkSync Era Sepolia Testnet
COMPILER_VERSION="0.8.20"
PAYMASTER_MIN_GAS=100000
WATCH_FLAG="--watch"

# Print usage information
function print_usage {
    echo -e "${YELLOW}Advanced Contract Verification for zkSync Era${NC}"
    echo -e "${YELLOW}Usage: ./verify-advanced.sh [OPTIONS]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo -e "  -p, --paymaster ADDRESS      PaymasterAgreement contract address"
    echo -e "  -s, --service ADDRESS        ServiceAgreement contract address"
    echo -e "  -n, --network NETWORK        Network (sepolia, mainnet) [default: sepolia]"
    echo -e "  -c, --chain-id ID            Chain ID [default: 300 for sepolia]"
    echo -e "  -v, --compiler VERSION       Solidity compiler version [default: 0.8.20]"
    echo -e "  -g, --min-gas VALUE          Minimum gas requirement for PaymasterAgreement [default: 100000]"
    echo -e "  -w, --no-watch               Don't watch for verification status"
    echo -e "  -h, --help                   Show this help message"
    echo -e "${YELLOW}Example: ./verify-advanced.sh -p 0x1234...abcd -s 0x5678...efgh -n mainnet${NC}"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -p|--paymaster)
            PAYMASTER_ADDRESS="$2"
            shift 2
            ;;
        -s|--service)
            SERVICE_AGREEMENT_ADDRESS="$2"
            shift 2
            ;;
        -n|--network)
            NETWORK="$2"
            if [[ "$NETWORK" == "mainnet" ]]; then
                CHAIN_ID=324
            elif [[ "$NETWORK" == "sepolia" ]]; then
                CHAIN_ID=300
            else
                echo -e "${RED}Error: Unknown network $NETWORK. Supported networks: sepolia, mainnet${NC}"
                exit 1
            fi
            shift 2
            ;;
        -c|--chain-id)
            CHAIN_ID="$2"
            shift 2
            ;;
        -v|--compiler)
            COMPILER_VERSION="$2"
            shift 2
            ;;
        -g|--min-gas)
            PAYMASTER_MIN_GAS="$2"
            shift 2
            ;;
        -w|--no-watch)
            WATCH_FLAG=""
            shift
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo -e "${RED}Error: Unknown option $key${NC}"
            print_usage
            exit 1
            ;;
    esac
done

# Check if required addresses are provided
if [ -z "$PAYMASTER_ADDRESS" ] || [ -z "$SERVICE_AGREEMENT_ADDRESS" ]; then
    echo -e "${RED}Error: PaymasterAgreement and ServiceAgreement addresses are required${NC}"
    print_usage
    exit 1
fi

# Load environment variables
if [ -f ../.env ]; then
    source ../.env
fi

if [ -z "$ZKSYNC_VERIFY_API_KEY" ]; then
    echo -e "${YELLOW}Warning: ZKSYNC_VERIFY_API_KEY is not set. Verification might fail.${NC}"
    echo -e "${YELLOW}Add it to your .env file or export it before running this script.${NC}"
fi

# Set explorer URL and verifier URL based on network
if [[ "$NETWORK" == "mainnet" ]]; then
    EXPLORER_URL="https://explorer.zksync.io/address"
    VERIFIER_URL="https://explorer.era.zksync.io/contract_verification"
else
    EXPLORER_URL="https://$NETWORK.explorer.zksync.io/address"
    VERIFIER_URL="https://explorer.$NETWORK.era.zksync.dev/contract_verification"
fi

echo -e "${GREEN}Starting verification of contracts on zkSync Era $NETWORK...${NC}"
echo -e "${GREEN}Network: $NETWORK (Chain ID: $CHAIN_ID)${NC}"
echo -e "${GREEN}Compiler version: $COMPILER_VERSION${NC}"
echo -e "${GREEN}PaymasterAgreement: ${PAYMASTER_ADDRESS}${NC}"
echo -e "${GREEN}ServiceAgreement: ${SERVICE_AGREEMENT_ADDRESS}${NC}"
echo -e "${GREEN}PaymasterAgreement min gas: ${PAYMASTER_MIN_GAS}${NC}"

# Verify PaymasterAgreement
echo -e "${GREEN}Verifying PaymasterAgreement...${NC}"
forge verify-contract \
    --chain-id $CHAIN_ID \
    --compiler-version $COMPILER_VERSION \
    --constructor-args $(cast abi-encode "constructor(uint256)" $PAYMASTER_MIN_GAS) \
    --verifier-url "$VERIFIER_URL" \
    $WATCH_FLAG \
    $PAYMASTER_ADDRESS \
    src/core/PaymasterAgreement.sol:PaymasterAgreement

echo -e "${GREEN}✓ PaymasterAgreement verification submitted${NC}"

# Verify ServiceAgreement
echo -e "${GREEN}Verifying ServiceAgreement...${NC}"
forge verify-contract \
    --chain-id $CHAIN_ID \
    --compiler-version $COMPILER_VERSION \
    --constructor-args $(cast abi-encode "constructor(address)" $PAYMASTER_ADDRESS) \
    --verifier-url "$VERIFIER_URL" \
    $WATCH_FLAG \
    $SERVICE_AGREEMENT_ADDRESS \
    src/core/ServiceAgreement.sol:ServiceAgreement

echo -e "${GREEN}✓ ServiceAgreement verification submitted${NC}"

echo -e "${GREEN}All verification requests have been submitted!${NC}"
echo -e "${YELLOW}Note: It may take a few minutes for the verification to complete.${NC}"
echo -e "${YELLOW}You can check the status on the zkSync Era Explorer:${NC}"
echo -e "${YELLOW}PaymasterAgreement: $EXPLORER_URL/${PAYMASTER_ADDRESS}${NC}"
echo -e "${YELLOW}ServiceAgreement: $EXPLORER_URL/${SERVICE_AGREEMENT_ADDRESS}${NC}" 