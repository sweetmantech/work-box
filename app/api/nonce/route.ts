import {cookies} from "next/headers"; 
import {NextRequest, NextResponse} from "next/server";

export function GET(req: NextRequest) {
  // Expects only alphanumeric characters
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const response = NextResponse.json({ nonce });
  response.cookies.set("siwe", nonce, { secure: true });
  
  return response;
}

