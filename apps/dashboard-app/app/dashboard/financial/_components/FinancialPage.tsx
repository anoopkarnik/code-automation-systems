'use client'
import React, { useState }  from 'react'
import { financeItems } from '../../../../lib/constant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import Overview from './Overview'
import Account from './Account'
import Transactions from './Transactions'
import Settings from './Settings'
import { FilterIcon } from 'lucide-react'
import MonthlyBudget from './MonthlyBudget'
import BudgetPlan from './BudgetPlan'
import FinancialGoals from './FinancialGoals'

const FinancialPage = () => {

  const [showFilters , setShowFilters] = useState(false)
  return (
    <Tabs className='w-full m-4' defaultValue='overview'>
      <TabsList className='w-full flex items-center justify-start rounded-none py-6 gap-4 bg-inherit'>
        {financeItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1 border-b-2 shadow-md shadow-white/10 ' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
        <FilterIcon onClick={()=>setShowFilters(!showFilters)} className={`mx-4 h-6 w-6 cursor-pointer ${showFilters ? 'text-white': ''} `}/>
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Account'>
        <Account showFilters={showFilters}/>
      </TabsContent>
      <TabsContent value='Transactions'>
        <Transactions showFilters={showFilters}/>
      </TabsContent>
      <TabsContent value='Monthly Budget'>
        <MonthlyBudget showFilters={showFilters}/>
      </TabsContent>
      <TabsContent value='Budget Plan'>
        <BudgetPlan showFilters={showFilters}/>
      </TabsContent>
      <TabsContent value='Financial Goals'>
        <FinancialGoals showFilters={showFilters}/>
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default FinancialPage