import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';


export async function GET(req: NextRequest) {

    const oauth2Client = new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_DRIVE_CLIENT_ID,
        process.env.NEXT_PUBLIC_DRIVE_CLIENT_SECRET,
        process.env.NEXT_PUBLIC_DRIVE_REDIRECT_URI
    );

    // generate a url that asks permissions for Google Drive scopes
    const scopes = [
        'https://www.googleapis.com/auth/drive',                 // Full access to Google Drive        // Access to app-specific data in Google Drive
    ];


    const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: scopes
    });
    return NextResponse.redirect(url);
}