import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from '@worldcoin/minikit-js'
import { createUser } from '../users/route'  // Import the shared createUser function
import { useUserStore } from '@/store/user';
import { supabase } from '@/lib/supabase/client';
interface IRequestPayload {
	payload: MiniAppWalletAuthSuccessPayload
	nonce: string
}

export const POST = async (req: NextRequest) => {
	const { payload, nonce } = (await req.json()) as IRequestPayload
	console.log('payload siwe', payload)
	const { wallet, setUser } = useUserStore();
	if (payload.status === 'success') {
		const { address } = payload
		try {
			// First check if user exists
			const { data: existingUser, error: fetchError } = await supabase
				.from('users')
				.select()
				.eq('wallet', address)
				.single();

			if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
				throw fetchError;
			}

			if (!existingUser) {
				// Only create user if they don't exist
				await createUser({ wallet: address });
				await setUser({ wallet: address });
			}

			const cookieStore = await cookies()
			
			if (nonce != cookieStore.get('siwe')?.value) {
				return NextResponse.json({
					status: 'error',
					isValid: false,
					message: 'Invalid nonce',
				})
			}

			const validMessage = await verifySiweMessage(payload, nonce)
			return NextResponse.json({
				status: 'success',
				isValid: validMessage.isValid,
				user: existingUser || { wallet: address } // Return existing user or new user data
			})

		} catch (error: any) {
			console.error('Error handling user:', error);
			return NextResponse.json(
				{ error: error.message },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({
		status: 'error',
		isValid: false,
		message: 'Invalid payload status'
	})
}
