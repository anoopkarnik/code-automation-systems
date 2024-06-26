import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.nextUrl.searchParams.get('apiKey');
  if (apiKey) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard/connections?apiKey=${apiKey}`);
    }
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard/connections`);
}
