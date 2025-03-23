import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

interface UserData {

  wallet?: string;

}

export async function createUser(userData: UserData) {
  const supabase = await createClient()

  try {
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([{

        wallet: userData.wallet || null,

      }])
      .select()
      .single();

    if (profileError) {
      throw profileError;
    }

    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

