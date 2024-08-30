'use client'
import React, { useContext, useEffect, useState } from 'react'
import { format } from "date-fns";
import { DatePickerWithRange } from '@repo/ui/molecules/shadcn/DateRange';
import { ConnectionsContext } from '../../../../providers/connections-provider';
import { getAccountsSummary, getDateSpecificFinancialSummary, getLastMonthsFinancialSummary, getYearlyBudgetSummary,
    getMonthlyBudgetSummary, getPastMonthsBudgetSummary,  } from '../../../../actions/notion/financial'
import ChartCard from '@repo/ui/molecules/custom/ChartCard';
import { ChartConfig } from '@repo/ui/molecules/shadcn/Chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import {Skeleton} from '@repo/ui/molecules/shadcn/Skeleton'
import HeaderCard from '@repo/ui/molecules/custom/HeaderCard';
import { queryNotionDatabaseAction } from '../../../../actions/notion/notion';
import TransactionForm from './TransactionForm';
import BudgetForm from './BudgetForm';

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
  const [timeLeftToLoss, setTimeLeftToLoss] = useState(0)
  const [timeLeftToBankruptcy, setTimeLeftToBankruptcy] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Add Transaction
  const [budgets, setBudgets] = useState([])


  useEffect(() => {
    const updateSummary = async () => {
      try{
        const startTime = new Date().getTime()
        const endDate = new Date()
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
        setStartDate(format(startDate, 'dd MMMyy'))
        setEndDate(format(endDate, 'dd MMMyy'))
        if (!apiToken || !transactionsDbId || !accountsDbId || !budgetDbId) {
          return
        }
        const budgets = await queryNotionDatabaseAction({apiToken,database_id:budgetDbId}) 
        setBudgets(budgets.results)
        
        let dateSpecificSummary = await getDateSpecificFinancialSummary({apiToken,transactionsDbId,startDate,endDate})
        setDateSpecificSummary(dateSpecificSummary)
        let lastMonthsSummary = await getLastMonthsFinancialSummary({apiToken,transactionsDbId,k:6 })
        setLastMonthsSummary(lastMonthsSummary)
        let accountsSummary = await getAccountsSummary({apiToken,accountsDbId})
        setAccountsSummary(accountsSummary)
        let monthlyBudgetSummary = await getMonthlyBudgetSummary({apiToken,budgetDbId})
        setMonthlyBudgetSummary(monthlyBudgetSummary)
        let yearlyBudgetSummary = await getYearlyBudgetSummary({apiToken,budgetDbId,transactionsDbId})
        setYearlyBudgetSummary(yearlyBudgetSummary)
        let budgetSummary = await getPastMonthsBudgetSummary({apiToken,budgetDbId,transactionsDbId,k:6})
        setPastMonthsBudgetSummary(budgetSummary)
        let liquidMoney = Number(accountsSummary?.totalExpensesByLiquidity?.find((item:any) => item.type === 'Liquid')?.totalExpenses)
        let monthlyBudget = Number(monthlyBudgetSummary?.monthlyBudget)*1.2
        let yearlyBudget = Number(yearlyBudgetSummary?.yearlyBudget)/12
        let partialLiquidMoney = Number(accountsSummary?.totalExpensesByLiquidity?.find((item:any) => item.type === 'Partially Liquid')?.totalExpenses)
        setTimeLeftToLoss(Math.round(liquidMoney/(monthlyBudget+yearlyBudget)))
        setTimeLeftToBankruptcy(Math.round((liquidMoney+partialLiquidMoney)/(monthlyBudget+yearlyBudget)))
        
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


  return (
    <div className='w-[95%] mx-[2.5%] my-6 '>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
        <HeaderCard title='Current Month Expenses' description='Total expenses in the current Month' value={`Rs ${dateSpecificSummary?.totalExpense}`}/>
        <HeaderCard title='Current Account Balance' description='Total Balance liquid, partially liquid and illiquid' value={`Rs ${accountsSummary?.totalBalance}`}/>
        <HeaderCard title='Time Left to Bankruptcy' description='Time left to Bankruptcy based on current expenses and income' value={`${timeLeftToBankruptcy} Months`}/>
        <HeaderCard title='Time Left to Loss' description='Time left to Loss based on current expenses and income' value={`${timeLeftToLoss} Months`}/>
      </div>
      <div>
      {budgets ? 
        <Accordion type="single" collapsible className='w-full'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className='flex justify-between items-center w-full mr-2'>
                <div> Add New Transactions and Budgets </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <TransactionForm/>
              <BudgetForm/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />
      }
      {dateSpecificSummary ? 
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
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />
      }
      {lastMonthsSummary? 
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
        </Accordion>:
        <Skeleton className=" h-[30px] rounded-full my-6" />
      }
        {accountsSummary? <Accordion type="single" collapsible className='w-full'>
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
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />}
        {monthlyBudgetSummary? <Accordion type="single" collapsible className='w-full'>
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
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />}
        {yearlyBudgetSummary? <Accordion type="single" collapsible className='w-full'>
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
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />}
        {pastMonthsBudgetSummary?<Accordion type="single" collapsible className='w-full'>
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
        </Accordion>: <Skeleton className=" h-[30px] rounded-full my-6" />}
      </div>
    </div>
  )
}

export default Overview