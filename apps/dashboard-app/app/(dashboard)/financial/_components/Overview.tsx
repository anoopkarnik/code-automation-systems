'use client'
import React, { useContext, useEffect, useState } from 'react'
import { format } from "date-fns";
import { DatePickerWithRange } from '@repo/ui/molecules/shadcn/DateRange';
import { ConnectionsContext } from '../../../../providers/connections-provider';
import { getAccountsSummary, getDateSpecificFinancialSummary, getLastMonthsFinancialSummary, getYearlyBudgetSummary,  getMonthlyBudgetSummary, getPastMonthsBudgetSummary,  } from '../_actions/notion';
import ChartCard from '@repo/ui/molecules/common/ChartCard';
import { ChartConfig } from '@repo/ui/molecules/shadcn/Chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import {Skeleton} from '@repo/ui/molecules/shadcn/Skeleton'

const Overview = () => {

  const connectionsContext = useContext(ConnectionsContext)
  const apiToken = connectionsContext?.notionNode?.accessToken
  const transactionsDbId = connectionsContext?.notionNode?.transactionsDb?.id
  const accountsDbId = connectionsContext?.notionNode?.accountsDb?.id
  const budgetDbId = connectionsContext?.notionNode?.monthlyBudgetDb?.id
  const [dateSpecificSummary, setDateSpecificSummary] = useState<any>(undefined)
  const [lastMonthsSummary, setLastMonthsSummary] = useState<any>(undefined)
  const [accountsSummary, setAccountsSummary] = useState<any>(undefined)
  const [monthlyBudgetSummary, setMonthlyBudgetSummary] = useState<any>(undefined)
  const [yearlyBudgetSummary, setYearlyBudgetSummary] = useState<any>(undefined)
  const [pastMonthsBudgetSummary, setPastMonthsBudgetSummary] = useState<any>(undefined)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const updateSummary = async () => {
      try{
        const endDate = new Date()
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
        setStartDate(format(startDate, 'dd MMMyy'))
        setEndDate(format(endDate, 'dd MMMyy'))
        if (!apiToken || !transactionsDbId || !accountsDbId || !budgetDbId) {
          return
        }
        const [dateSpecificSummary,lastMonthsSummary,accountsSummary,monthlyBudgetSummary,
          yearlyBudgetSummary,budgetSummary] = await Promise.all([
            getDateSpecificFinancialSummary({apiToken,transactionsDbId,startDate,endDate}),
            getLastMonthsFinancialSummary({apiToken,transactionsDbId,k:6 }),
            getAccountsSummary({apiToken,accountsDbId}),
            getMonthlyBudgetSummary({apiToken,budgetDbId}),
            getYearlyBudgetSummary({apiToken,budgetDbId,transactionsDbId}),
            getPastMonthsBudgetSummary({apiToken,budgetDbId,transactionsDbId,k:6})
          ])
        setDateSpecificSummary(dateSpecificSummary)
        setLastMonthsSummary(lastMonthsSummary)
        setAccountsSummary(accountsSummary)
        setMonthlyBudgetSummary(monthlyBudgetSummary)
        setYearlyBudgetSummary(yearlyBudgetSummary)
        setPastMonthsBudgetSummary(budgetSummary)
        
      }catch(e){
        console.error('Error in fetching financial summary',e)
      }
    }
    updateSummary()
  },[apiToken, transactionsDbId, accountsDbId, budgetDbId])



  const onTimeUpdate = async (dateRange: any) => {
    if (!dateRange) {
      return;
    }
    const startDate =  format(dateRange.from, 'yyyy-MM-dd')
    const endDate = format(dateRange.to, 'yyyy-MM-dd')
    setStartDate(format(dateRange.from, 'dd MMMyy'))
    setEndDate(format(dateRange.to, 'dd MMMyy'))
    const dateSpecificSummary = await getDateSpecificFinancialSummary({apiToken,transactionsDbId,startDate,endDate  })
    setDateSpecificSummary(dateSpecificSummary)
  }

  const chartConfig1: ChartConfig = {
    totalExpenses:{
      label: "Total Expense",
    }
  }

  const chartConfig2: ChartConfig = {
    Living:{
      label: "Living",
    },
    Delight:{
      label: "Delight",
    },
    Growth:{
      label: "Growth",
    },
    Savings:{
      label: "Savings",
    },
    Others:{
      label: "Misc",
    }
  }

  const chartConfig3: ChartConfig = {
    totalExpenses:{
      label: "Total Balance",
    }
  }

  const chartConfig4: ChartConfig = {
    cost:{
      label: "Predicted expense",
    },
    expense:{
      label: "Actual expense",
    }
  }

  if (!accountsSummary) return (
    <div className='w-[95%] mx-[2.5%] my-6 flex flex-col gap-4'>
        <Skeleton className=" h-[30px] rounded-full my-2" />
        <Skeleton className=" h-[30px] rounded-full my-2" />
        <Skeleton className=" h-[30px] rounded-full my-2" />
        <Skeleton className=" h-[30px] rounded-full my-2" />
        <Skeleton className=" h-[30px] rounded-full my-2" />
        <Skeleton className=" h-[30px] rounded-full my-2" />
    </div>
  )

  return (
    <div className='w-[95%] mx-[2.5%] '>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
              <div>Total Expenses between {startDate} & {endDate} </div>
              <div>Rs {dateSpecificSummary.totalExpense}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
          <DatePickerWithRange modifyUrl={onTimeUpdate}/>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

            <ChartCard 
                title='Total Expenses By Expense Type' 
                description='Total expenses By Expense Type in the above specified Date'
                chartData={dateSpecificSummary?.totalExpensesByExpenseType} 
                chartConfig={chartConfig3}
                xKey='type'
                angle='horizontal'
              />
              <ChartCard 
                title='Total Expenses By Monthly Budget' 
                description='Total expenses By Monthly Budget in the above specified Date'
                chartData={dateSpecificSummary?.totalExpensesByBudgetType} 
                chartConfig={chartConfig3}
                xKey='type'
                angle='vertical'
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
             <div>Average Expenses in last 6 Months </div>
             <div> Rs {lastMonthsSummary?.reduce((acc:any, item:any) => { return acc += item.totalExpenses},0)/6}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

              <ChartCard 
                title='Total Expenses' 
                description='Total expenses in the last 6 months'
                chartData={lastMonthsSummary}
                chartConfig={chartConfig1}
                xKey='month'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Expenses By Expense Type' 
                description='Total expenses By Expense Type in the last 6 months'
                chartData={lastMonthsSummary}
                chartConfig={chartConfig2}
                xKey='month'
                angle='horizontal'
                />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
              <div>Account Balance</div>
              <div>Rs {accountsSummary.totalBalance}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

                <ChartCard 
                    title='Total Amount By Asset Type' 
                    description='Total amount by Asset Type'
                    chartData={accountsSummary?.totalExpensesByAssetType} 
                    chartConfig={chartConfig3}
                    xKey='type'
                    angle='horizontal'
                  />
                  <ChartCard 
                    title='Total Amount By Liquidity' 
                    description='Total amount by how Liquid the Asset is'
                    chartData={accountsSummary?.totalExpensesByLiquidity} 
                    chartConfig={chartConfig3}
                    xKey='type'
                    angle='horizontal'
                  />
                  <ChartCard 
                    title='Total amount By Asset/Liability Name' 
                    description='Total amount By Asset/Liability Name'
                    chartData={accountsSummary?.totalExpensesByName} 
                    chartConfig={chartConfig3}
                    xKey='type'
                    angle='vertical'
                  />
              </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
             <div>Current Monthly Cost | Budget </div>
             <div> Rs {monthlyBudgetSummary?.monthlyExpense} | Rs {monthlyBudgetSummary?.monthlyBudget}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

              <ChartCard 
                title='Total Budget and Cost By Expense Type' 
                description='Total budget and cost By Expense Type '
                chartData={monthlyBudgetSummary?.monthlyBudgetByExpenseType}
                chartConfig={chartConfig4}
                xKey='type'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Budget and Cost By Budget Name' 
                description='Total budget and cost By Budget Name'
                chartData={monthlyBudgetSummary?.monthlyBudgetByName}
                chartConfig={chartConfig4}
                xKey='type'
                angle='vertical'
                />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
             <div>Current Yearly Cost | Budget </div>
             <div> Rs {yearlyBudgetSummary?.yearlyExpense} | Rs {yearlyBudgetSummary?.yearlyBudget}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

              <ChartCard 
                title='Total Budget and Cost By Expense Type' 
                description='Total budget and cost By Expense Type '
                chartData={yearlyBudgetSummary?.yearlyBudgetByExpenseType}
                chartConfig={chartConfig4}
                xKey='type'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Budget and Cost By Budget Name' 
                description='Total budget and cost By Budget Name'
                chartData={yearlyBudgetSummary?.yearlyBudgetByName}
                chartConfig={chartConfig4}
                xKey='type'
                angle='vertical'
                />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
             <div>Average Monthly Cost | Budget </div>
             <div> Rs {pastMonthsBudgetSummary?.totalLastMonthExpenses/6} | Rs {pastMonthsBudgetSummary?.totalLastMonthCosts}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>
              <ChartCard 
                title='Total Budget and Cost By Month' 
                description='Total budget and cost By Month '
                chartData={pastMonthsBudgetSummary?.totalBudgetByMonth}
                chartConfig={chartConfig4}
                xKey='month'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Living Budget and Cost By Month' 
                description='Total Living budget and cost By Month '
                chartData={pastMonthsBudgetSummary?.totalLivingBudgetByMonth}
                chartConfig={chartConfig4}
                xKey='month'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Delight Budget and Cost By Month' 
                description='Total Delight budget and cost By Month '
                chartData={pastMonthsBudgetSummary?.totalDelightBudgetByMonth}
                chartConfig={chartConfig4}
                xKey='month'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Growth Budget and Cost By Month' 
                description='Total Growth budget and cost By Month '
                chartData={pastMonthsBudgetSummary?.totalGrowthBudgetByMonth}
                chartConfig={chartConfig4}
                xKey='month'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Savings Budget and Cost By Month' 
                description='Total Savings budget and cost By Month '
                chartData={pastMonthsBudgetSummary?.totalSavingsBudgetByMonth}
                chartConfig={chartConfig4}
                xKey='month'
                angle='horizontal'
                />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Overview