import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.nextUrl.searchParams.get('apiKey');
  const type = 'OpenAI';
  const redirectUrl = apiKey 
    ? `${ process.env.NEXT_PUBLIC_URL}/connections?apiKey=${apiKey}&type=${type}`
    : `${ process.env.NEXT_PUBLIC_URL}/sconnections`;

  console.log('Redirect URL:', redirectUrl);
  console.log('NEXT_PUBLIC_URL:', process.env.NEXT_PUBLIC_URL);

  return NextResponse.redirect(redirectUrl);
}
