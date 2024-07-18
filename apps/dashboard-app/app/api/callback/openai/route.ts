import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.nextUrl.searchParams.get('apiKey');
  const type = 'OpenAI';
  if (apiKey) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard/connections?apiKey=${apiKey}&type=${type}`);
    }
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard/connections`);
}
