import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const encoded = Buffer.from(
    `5f2da6f3-8d58-419a-829b-0d3c66ab082b:secret_p6CJXm8dTi1iB1PeXe0MGEWFwJItnd70H8QYzNWDLzB`
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
        redirect_uri: 'http://localhost:4000/api/callback/notion',
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
      

      return NextResponse.redirect(
        `http://localhost:4000/dashboard/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`
      );
    }
  }

  return NextResponse.redirect('http://localhost:4000/dashboard/connections');
}
