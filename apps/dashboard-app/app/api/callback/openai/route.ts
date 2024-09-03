import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.nextUrl.searchParams.get('apiKey');
  const type = 'OpenAI';
  const redirectUrl = apiKey 
    ? `/connections?apiKey=${apiKey}&type=${type}`
    : `/sconnections`;

  console.log('Redirect URL:', redirectUrl);
  console.log('NEXT_PUBLIC_URL:', process.env.NEXT_PUBLIC_URL);
  redirect(redirectUrl);
}
