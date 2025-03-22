This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment to zkSync Era

This project includes smart contracts designed for deployment on the zkSync Era network. Due to zkSync's specialized deployment process, we provide two approaches for deployment:

### Manual Deployment (Recommended)

1. Run the preparation script to generate deployment artifacts:

   ```bash
   ./prepare-zksync-deployment.sh
   ```

2. Follow the instructions in `deployment-artifacts/DEPLOYMENT_INSTRUCTIONS.md` to manually deploy the contracts through the zkSync Portal.

3. After deployment, verify your contracts with:
   ```bash
   ./verify-zksync-contracts.sh <paymasterAgreementAddress> <serviceAgreementAddress>
   ```
   Then follow the instructions in `verification-guide/VERIFICATION_INSTRUCTIONS.md`.

### Scripted Deployment (Advanced)

For automated deployment, you can use the Foundry script approach, but it might encounter the "toAddressIsNull" error:

```bash
./deploy-to-zksync.sh
```

If you encounter errors, fall back to the manual deployment process above.

## Contract Structure

- `PaymasterAgreement.sol`: Handles paymaster functionality and ETH management
- `ServiceAgreement.sol`: Manages service agreements between clients and service providers, with milestone-based payments

## Testing

Run tests with:

```bash
forge test
```

For more verbose output:

```bash
forge test -vvv
```
