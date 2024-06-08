import { NEXT_AUTH_CONFIG } from "./lib/auth";
import { getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'

export default async function Home() {
  const session:any = await getServerSession(NEXT_AUTH_CONFIG as any)

  if (session?.user){
    redirect('/api/practise-apps')
  }
  else{
    redirect('/api/auth/signin')
  }
}
