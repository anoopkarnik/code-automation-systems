'use client'
import React  from 'react'
import { financeItems } from '../../../lib/constant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import Overview from './_components/Overview'
import Account from './_components/Account'
import Transactions from './_components/Transactions'
import Reports from './_components/Reports'
import Settings from './_components/Settings'
const page = () => {


  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='w-full flex items-center justify-start rounded-none py-6 gap-4'>
        {financeItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='account'>
        <Account/>
      </TabsContent>
      <TabsContent value='transactions'>
        <Transactions/>
      </TabsContent>
      <TabsContent value='reports'>
        <Reports/>
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default page