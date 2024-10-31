import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getYoutubeConnection } from '../../../../../../../actions/connections/youtube-connections';

const YoutubeCode = () => {
    

    //Youtube Variables
    const [youtubeAccounts, setYoutubeAccounts] = useState<any>([])
    const [selectedYoutubeAccount, setSelectedYoutubeAccount] = useState('')
    const youtubeClientId:any = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID;
    const youtubeClientSecret:any = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET;

    const [variable, setVariable] = useState<any>('');
    const [sampleCode, setSampleCode] = useState<any>('');
    const session = useSession();
    const userId = session?.data?.user?.id;

    useEffect(() => {
        const fetchYoutubeDetails = async () => {
            if (!userId) return;
            const res:any = await getYoutubeConnection(userId);
            const youtubeClientId = 
            setYoutubeAccounts(res);
        }
        fetchYoutubeDetails()
    },[userId,selectedYoutubeAccount])

    const fetchAccessTokenCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/youtube/getAccessToken.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{client_id}}", youtubeClientId);
            text = text.replaceAll("{{client_secret}}", youtubeClientSecret);
            text = text.replaceAll("{{refresh_token}}", selectedYoutubeAccount);
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchSubscribedChannelsDataCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/youtube/getSubscribedChannelsData.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{client_id}}", youtubeClientId);
            text = text.replaceAll("{{client_secret}}", youtubeClientSecret);
            text = text.replaceAll("{{refresh_token}}", selectedYoutubeAccount);
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    }


    const fetchLikedVideosCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/youtube/getLikedVideos.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{client_id}}", youtubeClientId);
            text = text.replaceAll("{{client_secret}}", youtubeClientSecret);
            text = text.replaceAll("{{refresh_token}}", selectedYoutubeAccount);
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    }

  return (
    <div>
        <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%]'>
            <Label className='ml-2'>Youtube Account</Label>
            <Select onValueChange={(value) => setSelectedYoutubeAccount(value)} defaultValue={selectedYoutubeAccount}>
                <SelectTrigger>
                    <SelectValue placeholder='Select Youtube Account'/>  
                </SelectTrigger>
                <SelectContent>
                    {youtubeAccounts?.map((account:any) => (
                        <SelectItem key={account.id} value={account.refresh_token}>{account.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        
        <div className='flex gap-2 mt-4 ml-2 items-center flex-wrap'>
            {selectedYoutubeAccount && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(selectedYoutubeAccount)}>
                    Get Refresh Token
                </Button> }
            <Button size="sm" variant="outline"  onClick={() => setVariable(youtubeClientId)}>
                Get Youtube Client ID
            </Button>
            <Button size="sm" variant="outline"  onClick={() => setVariable(youtubeClientSecret)}>
                Get Youtube Client Secret
            </Button>
            {selectedYoutubeAccount && <Button size="sm" variant="outline"  onClick={fetchAccessTokenCode}>
                Get Access Token
            </Button>}
            {selectedYoutubeAccount && <Button size="sm" variant="outline"  onClick={fetchSubscribedChannelsDataCode}>
                Get Subscribed Channels
            </Button>}
            {selectedYoutubeAccount && <Button size="sm" variant="outline"  onClick={fetchLikedVideosCode}>
                Get Liked Videos
            </Button>}
        </div>

        {variable && <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />}
        {sampleCode && <textarea className='p-2 mt-4 w-full h-96' value={sampleCode} placeholder='Sample Code' />}
    </div>
  )
}

export default YoutubeCode