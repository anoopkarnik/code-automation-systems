'use client'
import React, { useContext, useEffect, useState } from 'react'
import { format, set } from "date-fns";
import { DatePickerWithRange } from '@repo/ui/molecules/shadcn/DateRange';
import { ConnectionsContext } from '../../../../providers/connections-provider';
import { getAccountsSummary, getDateSpecificFinancialSummary, getLastMonthsFinancialSummary, getBudgetSummary } from '../_actions/notion';
import ChartCard from '@repo/ui/molecules/common/ChartCard';
import { ChartConfig } from '@repo/ui/molecules/shadcn/Chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';

const Overview = () => {

  const connectionsContext = useContext(ConnectionsContext)
  const apiToken = connectionsContext?.notionNode?.accessToken
  const transactionsDbId = connectionsContext?.notionNode?.transactionsDb?.id
  const accountsDbId = connectionsContext?.notionNode?.accountsDb?.id
  const budgetDbId = connectionsContext?.notionNode?.monthlyBudgetDb?.id
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [averageExpense, setAverageExpense] = useState<number>(0) 
  const [totalBalance, setTotalBalance] = useState<number>(0)
  const [dateSpecificSummary, setDateSpecificSummary] = useState<any>({})
  const [lastMonthsSummary, setLastMonthsSummary] = useState<any>({})
  const [accountsSummary, setAccountsSummary] = useState<any>({})
  const [budgetSummary, setBudgetSummary] = useState<any>({})
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  useEffect(() => {
    const updateSummary = async () => {
      const endDate = new Date()
      const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
      setStartDate(format(startDate, 'dd MMMyy'))
      setEndDate(format(endDate, 'dd MMMyy'))
      if (!apiToken || !transactionsDbId) {
        return
      }
      const dateSpecificSummary = await getDateSpecificFinancialSummary({apiToken,transactionsDbId,startDate,endDate})
      setTotalExpense(dateSpecificSummary.totalExpense)
      const lastMonthsSummary = await getLastMonthsFinancialSummary({apiToken,transactionsDbId,k:6 })
      setAverageExpense(lastMonthsSummary.reduce((acc:any, item:any) => { return acc += item.totalExpenses},0)/6)
      const accountsSummary = await getAccountsSummary({apiToken,accountsDbId})
      const budgetSummary = await getBudgetSummary({apiToken,budgetDbId})
      setTotalBalance(accountsSummary.totalBalance)
      setDateSpecificSummary(dateSpecificSummary)
      setLastMonthsSummary(lastMonthsSummary)
      setAccountsSummary(accountsSummary)
      setBudgetSummary(budgetSummary)
    }
    updateSummary()
  },[apiToken, transactionsDbId ])

  const onTimeUpdate = async (dateRange: any) => {
    if (!dateRange) {
      return;
    }
    const startDate =  format(dateRange.from, 'yyyy-MM-dd')
    const endDate = format(dateRange.to, 'yyyy-MM-dd')
    setStartDate(format(dateRange.from, 'dd MMMyy'))
    setEndDate(format(dateRange.to, 'dd MMMyy'))
    const dateSpecificSummary = await getDateSpecificFinancialSummary({apiToken,transactionsDbId,startDate,endDate  })
    setTotalExpense(dateSpecificSummary.totalExpense)
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

  return (
    <div className='mx-6 w-full'>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
              <div>Total Expenses between {startDate} & {endDate} </div>
              <div>Rs {totalExpense}</div>
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
             <div>Total Expenses in last 6 Months </div>
             <div> Rs {averageExpense}</div>
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
              <div>Rs {totalBalance}</div>
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
             <div>Monthly Cost | Budget </div>
             <div> Rs {budgetSummary?.monthlyExpense} | Rs {budgetSummary?.monthlyBudget}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

              <ChartCard 
                title='Total Budget and Cost By Expense Type' 
                description='Total budget and cost By Expense Type '
                chartData={budgetSummary?.monthlyBudgetByExpenseType}
                chartConfig={chartConfig4}
                xKey='type'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Budget and Cost By Budget Name' 
                description='Total budget and cost By Budget Name'
                chartData={budgetSummary?.monthlyBudgetByName}
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
             <div>Yearly  Cost | Budget </div>
             <div> Rs {budgetSummary?.yearlyExpense} | Rs {budgetSummary?.yearlyBudget}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-4'>

              <ChartCard 
                title='Total Budget and Cost By Expense Type' 
                description='Total budget and cost By Expense Type '
                chartData={budgetSummary?.yearlyBudgetByExpenseType}
                chartConfig={chartConfig4}
                xKey='type'
                angle='horizontal'
                />
              <ChartCard 
                title='Total Budget and Cost By Budget Name' 
                description='Total budget and cost By Budget Name'
                chartData={budgetSummary?.yearlyBudgetByName}
                chartConfig={chartConfig4}
                xKey='type'
                angle='vertical'
                />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Overview