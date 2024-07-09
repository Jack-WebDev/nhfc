import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  cookies().delete("authToken");
  cookies().delete("refreshToken");
  cookies().delete("accessToken");

  return NextResponse.json({});
}