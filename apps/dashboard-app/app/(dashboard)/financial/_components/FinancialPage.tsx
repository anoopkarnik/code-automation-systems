'use client'
import React, { useEffect, useState }  from 'react'
import { financeItems } from '../../../../lib/constant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import Overview from './Overview'
import Account from './Account'
import Transactions from './Transactions'
import Settings from './Settings'
import MonthlyBudget from './MonthlyBudget'
import BudgetPlan from './BudgetPlan'
import FinancialGoals from './FinancialGoals'
import { useMedia } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useRouter } from 'next/navigation'

const FinancialPage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Overview')
  const router = useRouter()

  const handleSelect = (value:any) => {
    setSelectedValue(value)
  }


  if (isMobile){
    return (
      <div className='flex flex-col items-center w-full min-w-max mr-10'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='my-4 mx-8 w-[200px]'>
            <div>{selectedValue}</div>
          </SelectTrigger>
          <SelectContent className='w-[200px]'>
            {financeItems.map((item:any) =>(
              <SelectItem key={item.title} value={item.title}>
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <item.icon/>
                  <div>{item.title}</div>
                </div>
              </SelectItem>
            ))}

          </SelectContent>
        </Select>
        {selectedValue === 'Overview' && <Overview/>}
        {selectedValue === 'Account' && <Account/>} 
        {selectedValue === 'Transactions' && <Transactions/>}
        {selectedValue === 'Monthly Budget' && <MonthlyBudget/>}
        {selectedValue === 'Budget Plan' && <BudgetPlan/>}
        {selectedValue === 'Financial Goals' && <FinancialGoals/>}
        {selectedValue === 'settings' && <Settings/>}
      </div>
    )
  }

  return (
    <Tabs className='mx-4 ' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
        {financeItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Account'>
        <Account />
      </TabsContent>
      <TabsContent value='Transactions'>
        <Transactions/>
      </TabsContent>
      <TabsContent value='Monthly Budget'>
        <MonthlyBudget/>
      </TabsContent>
      <TabsContent value='Budget Plan'>
        <BudgetPlan/>
      </TabsContent>
      <TabsContent value='Financial Goals'>
        <FinancialGoals />
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default FinancialPage