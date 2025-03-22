#!/bin/bash

# Verification script for zkSync Era contracts
# Based on https://foundry-book.zksync.io/forge/deploying?highlight=--verify#verifying-a-pre-existing-contract

# Exit script if any command fails
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if addresses are provided as arguments
if [ $# -ne 2 ]; then
    echo -e "${YELLOW}Usage: ./verify.sh <paymaster_address> <service_agreement_address>${NC}"
    echo -e "${YELLOW}Example: ./verify.sh 0x1234...abcd 0x5678...efgh${NC}"
    exit 1
fi

PAYMASTER_ADDRESS=$1
SERVICE_AGREEMENT_ADDRESS=$2

# Check if ZKSYNC_VERIFY_API_KEY is set in .env
if [ -f ../.env ]; then
    source ../.env
fi

if [ -z "$ZKSYNC_VERIFY_API_KEY" ]; then
    echo -e "${YELLOW}Warning: ZKSYNC_VERIFY_API_KEY is not set. Verification might fail.${NC}"
    echo -e "${YELLOW}Add it to your .env file or export it before running this script.${NC}"
fi

echo -e "${GREEN}Starting verification of contracts on zkSync Era...${NC}"
echo -e "${GREEN}PaymasterAgreement: ${PAYMASTER_ADDRESS}${NC}"
echo -e "${GREEN}ServiceAgreement: ${SERVICE_AGREEMENT_ADDRESS}${NC}"

# The network ID for zkSync Era Sepolia Testnet
CHAIN_ID=300

# Verify PaymasterAgreement
echo -e "${GREEN}Verifying PaymasterAgreement...${NC}"
forge verify-contract \
    --chain-id $CHAIN_ID \
    --compiler-version 0.8.20 \
    --constructor-args $(cast abi-encode "constructor(uint256)" 100000) \
    --watch \
    --verifier-url "https://explorer.sepolia.era.zksync.dev/contract_verification" \
    $PAYMASTER_ADDRESS \
    src/core/PaymasterAgreement.sol:PaymasterAgreement

echo -e "${GREEN}✓ PaymasterAgreement verification submitted${NC}"

# Verify ServiceAgreement
echo -e "${GREEN}Verifying ServiceAgreement...${NC}"
forge verify-contract \
    --chain-id $CHAIN_ID \
    --compiler-version 0.8.20 \
    --constructor-args $(cast abi-encode "constructor(address)" $PAYMASTER_ADDRESS) \
    --watch \
    --verifier-url "https://explorer.sepolia.era.zksync.dev/contract_verification" \
    $SERVICE_AGREEMENT_ADDRESS \
    src/core/ServiceAgreement.sol:ServiceAgreement

echo -e "${GREEN}✓ ServiceAgreement verification submitted${NC}"

echo -e "${GREEN}All verification requests have been submitted!${NC}"
echo -e "${YELLOW}Note: It may take a few minutes for the verification to complete.${NC}"
echo -e "${YELLOW}You can check the status on the zkSync Era Explorer: https://sepolia.explorer.zksync.io/address/${SERVICE_AGREEMENT_ADDRESS}${NC}" 