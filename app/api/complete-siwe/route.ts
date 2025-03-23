import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from '@worldcoin/minikit-js'
import { createUser } from '../users/createUser'  // Import the shared createUser function

interface IRequestPayload {
	payload: MiniAppWalletAuthSuccessPayload
	nonce: string
}

export const POST = async (req: NextRequest) => {
	const { payload, nonce } = (await req.json()) as IRequestPayload

	if (payload.status === 'success') {
		const { address } = payload
		try {	
			await createUser({ wallet: address })  // Pass the wallet address as part of UserData
		} catch (error: any) {
			console.error('Error creating user:', error);
			return NextResponse.json(
			  { error: error.message },
			  { status: 500 }
			);
		}
	}
	const cookieStore = await cookies()
	
	if (nonce != cookieStore.get('siwe')?.value) {
		return NextResponse.json({
			status: 'error',
			isValid: false,
			message: 'Invalid nonce',
		})
	}
	try {
		const validMessage = await verifySiweMessage(payload, nonce)
		return NextResponse.json({
			status: 'success',
			isValid: validMessage.isValid,
		})
	} catch (error: any) {
		// Handle errors in validation or processing
		return NextResponse.json({
			status: 'error',
			isValid: false,
			message: error.message,
		})
	}
}
