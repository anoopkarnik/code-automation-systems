"use server"

export async function getEnvironmentVariables(){
    var res:any = {}
    res["NEXT_PUBLIC_RESEND_API_KEY"] = process.env.NEXT_PUBLIC_RESEND_API_KEY
    res["NEXT_PUBLIC_URL"] = process.env.NEXT_PUBLIC_URL
    res["NEXT_PUBLIC_YOUTUBE_OAUTH_URL"] = process.env.NEXT_PUBLIC_YOUTUBE_OAUTH_URL
    res["NEXT_PUBLIC_NOTION_CLIENT_ID"] = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID
    res["NEXT_PUBLIC_NOTION_CLIENT_SECRET"] = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET
    res["NEXT_PUBLIC_NOTION_REDIRECT_URI"] = process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI
    res["NEXT_PUBLIC_NOTION_OAUTH_URL"] = process.env.NEXT_PUBLIC_NOTION_OAUTH_URL
    return res

}