
'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ConnectionsContext } from '../providers/connections-provider'
import { getNotionInfo } from '../app/(dashboard)/financial/_actions/notion'

const useConnection = () => {
  const connectionsContext = useContext(ConnectionsContext)
  const session = useSession();
  const userId = session.data?.user?.id;

  useEffect(() =>{
    const onAddConnection = async () =>{
        const notion_info = await getNotionInfo(userId || '')
    //   const openAi_info = await getOpenAIByUserId(userId || '')
      if (notion_info){
        connectionsContext.setNotionNode({notionId: notion_info?.id,accessToken:notion_info?.accessToken,
          workspace_name:notion_info?.workspaceName,accountsDb: notion_info?.notionDb?.accountsDb,
          transactionsDb:notion_info?.notionDb?.transactionsDb,monthlyBudgetDb:notion_info?.notionDb?.monthlyBudgetDb,
          budgetPlanDb:notion_info?.notionDb?.budgetPlanDb})
      }
    //   if (openAi_info){
    //     connectionsContext.setOpenAINode({apiKey:openAi_info?.apiKey})
    //   }
    }
    if (userId) {
        onAddConnection();
    }
  },[userId, connectionsContext])
  return null;
}

export default useConnection;
