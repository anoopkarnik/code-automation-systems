import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(req: NextRequest) {   

    const oauth2Client = new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
        process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET,
        process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI
    );
    
    const code = req.nextUrl.searchParams.get('code');
    const response = await oauth2Client.getToken(code as string);
    const type = 'Youtube';
    if (response){
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/connections?access_token=${response.tokens.access_token}&refresh_token=${response.tokens.refresh_token}&scopes=${response.tokens.scope}&type=${type}`
          );
    }


    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/connections`);
}
