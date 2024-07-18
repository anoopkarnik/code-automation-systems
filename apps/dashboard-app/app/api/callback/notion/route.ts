import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const encoded = Buffer.from(
    `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET}`
  ).toString('base64');
  if (code) {
    const response = await axios('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28',
      },
      data: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI,
      }),
    });
    if (response) {
      const notion = new Client({
        auth: response.data.access_token,
      });
      const databasesPages = await notion.search({
        filter: {
          value: 'database',
          property: 'object',
        },
        sort: {
          direction: 'ascending',
          timestamp: 'last_edited_time',
        },
      });
      const databaseId = databasesPages?.results?.length
        ? databasesPages?.results[0]?.id
        : '';

      console.log(`Number of databases connected: ${databasesPages?.results?.length}`);
      const type = 'Notion';
      

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}&type=${type}`
      );
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/connections`);
}
