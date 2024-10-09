'use server'

import {queryAllNotionDatabase } from '@repo/notion/notion-client'
import { format } from "date-fns";
import { queryNotionDatabaseByDateRange } from "./notion";

export const getDateSpecificFinancialSummary = async ({apiToken, transactionsDbId, startDate, endDate }:any) => {
    const response = await queryNotionDatabaseByDateRange({apiToken,database_id: transactionsDbId,startDate,endDate})
    let totalExpensesByType:any = {}
    let totalExpensesByBudget:any = {}
    let totalExpensesByExpenseType:any = []
    let totalExpensesByBudgetType:any = [] 

    let expenseTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Expense Type'][0])
        return acc
    },new Set())

    let monthlyBudgetTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Monthly Budget Name'][0])
        return acc
    },new Set())

    expenseTypes.forEach((type:any) => {
        totalExpensesByType[type] = response.results.filter((item:any) => item['Expense Type'].includes(type) || item['Old Expense Type'].includes(type) ).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        totalExpensesByExpenseType.unshift({type,totalExpenses:totalExpensesByType[type]})
        totalExpensesByExpenseType = totalExpensesByExpenseType.filter((item:any) => item.totalExpenses > 0)
    })

    monthlyBudgetTypes.forEach((type:any) => {
        totalExpensesByBudget[type] = response.results.filter((item:any) => item['Monthly Budget Name'].includes(type) || item['Old Monthly Budget Name'].includes(type) ).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        totalExpensesByBudgetType.unshift({type,totalExpenses:totalExpensesByBudget[type]})
        totalExpensesByBudgetType = totalExpensesByBudgetType.filter((item:any) => item.totalExpenses > 0)
    })

    let totalExpense = response.results.reduce((acc:any, item:any) => { return acc += item.Cost},0)
    
    let summary = {totalExpensesByExpenseType,totalExpensesByBudgetType,totalExpense}
    return summary;
}

const getLastKMonthsStartAndEndDates = async (k:number) => {
    const currentDate = new Date();
    const dates = [];
  
    for (let i = 0; i < k; i++) {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  
      dates.push({
        start: format(start,'yyyy-MM-dd'), // Format as YYYY-MM-DD
        end: format(end, 'yyyy-MM-dd'), // Format as YYYY-MM-DD
      });
    }
  
    return dates;
  };
  

export const getLastMonthsFinancialSummary = async ({apiToken, transactionsDbId,k}:any) => {
    const lastMonthsDates = await getLastKMonthsStartAndEndDates(k);
    let totalExpensesByMonth:any = []
    let totalExpensesByExpenseType:any = {}

    let expenseTypes = ['Living','Growth','Delight','Savings','Others']
    for (const dateRange of lastMonthsDates) {
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        if (startDate && endDate) {
            let currentMonth = format(new Date(startDate), "MMMyy")
            const response = await queryNotionDatabaseByDateRange({apiToken,database_id: transactionsDbId,startDate,endDate})
            let totalExpenses = response.results.reduce((acc:any, item:any) => {
                return acc += item.Cost;
            },0)
            for (let expenseType of expenseTypes){
                totalExpensesByExpenseType[expenseType] = response.results.filter((item:any) => item['Expense Type'].includes(expenseType) || item['Old Expense Type'].includes(expenseType) ).reduce((acc:any, item:any) => { return acc += item.Cost},0)  
            }
            totalExpensesByMonth.unshift({month:currentMonth, totalExpenses,...totalExpensesByExpenseType})
        }
    }
    return totalExpensesByMonth;    
}

export const getAccountsSummary = async ({apiToken, accountsDbId}:any) => {
    const response = await queryAllNotionDatabase({apiToken,database_id:accountsDbId,  filters: []})

    let totalExpensesByType:any = {}
    let totalExpensesByAssetType:any = []
    let summary:any = {}

    let assetTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Asset Type'])
        return acc
    },new Set())

    let liquidityTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Liquidity Type'])
        return acc
    },new Set())

    assetTypes.forEach((type:any) => {
        totalExpensesByType[type] = response.results.filter((item:any) => item['Asset Type'] === type).reduce((acc:any, item:any) => { return acc += item.balance},0)
        totalExpensesByAssetType.unshift({type,totalExpenses:totalExpensesByType[type]})
    })

    let totalExpensesByLiquidity:any = []

    liquidityTypes.forEach((type:any) => {
        totalExpensesByType[type] = response.results.filter((item:any) => item['Liquidity Type'] === type).reduce((acc:any, item:any) => { return acc += item.balance},0)
        totalExpensesByLiquidity.unshift({type,totalExpenses:totalExpensesByType[type]})
    })

    totalExpensesByType = {}
    let totalExpensesByName:any = []

    for (let item of response.results){
        totalExpensesByName.unshift({type:item.Name, totalExpenses:item.balance})
    }

    let totalBalance = response.results.reduce((acc:any, item:any) => { return acc += item.balance},0)

    summary = {
        totalExpensesByAssetType,
        totalExpensesByLiquidity,
        totalExpensesByName,
        totalBalance
    }

    return summary;
}

export const getMonthlyBudgetSummary = async ({apiToken, budgetDbId}:any) => {
    const response = await queryAllNotionDatabase({apiToken,database_id:budgetDbId,  filters: []})
    const filteredResults = response.results.filter((item:any) => item['Currently Applicable'] === true )

    let summary:any = {}
    let monthlyBudgetByExpenseType:any = []
    let monthlyBudgetByName:any = []

    let expenseTypes = filteredResults.reduce((acc:any, item:any) => {
        acc.add(item['Expense Type'])
        return acc
    },new Set())

    const monthlyResults = filteredResults.filter((item:any) => item['Payment Schedule Type'] === 'Monthly')

    let cost =0;
    let expense=0;
    expenseTypes.forEach((type:any) => {
        cost = monthlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        expense = monthlyResults.filter((item:any) => item['Expense Type'] === type).filter((item:any)=>item['Current Month Transaction Sum']).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)
        monthlyBudgetByExpenseType.unshift({type,cost,expense})
    })


    monthlyResults.forEach((item:any) => {
        monthlyBudgetByName.unshift({type:item.Name,cost:item.Cost,expense:item['Current Month Transaction Sum']})
    })

    let monthlyBudget = monthlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)
    let monthlyExpense = monthlyResults.filter((item:any)=>item['Current Month Transaction Sum']).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)


    summary = {
        monthlyBudgetByExpenseType,
        monthlyBudgetByName,
        monthlyBudget,  
        monthlyExpense,
    }
    return summary

}

export const getYearlyBudgetSummary = async ({apiToken, budgetDbId,transactionsDbId}:any) => {
    const response = await queryAllNotionDatabase({apiToken,database_id:budgetDbId,  filters: []})
    const filteredResults = response.results.filter((item:any) => item['Currently Applicable'] === true )

    const endDate = format(new Date(), 'yyyy-MM-dd')
    const startDate = format(new Date(new Date().getFullYear(),0,1), 'yyyy-MM-dd')
    const transactionsResponseYearly = await queryNotionDatabaseByDateRange({apiToken,database_id: transactionsDbId,startDate:startDate,endDate:endDate})

    let summary:any = {}
    let yearlyBudgetByExpenseType:any = []
    let yearlyBudgetByName:any = []

    let expenseTypes = filteredResults.reduce((acc:any, item:any) => {
        acc.add(item['Expense Type'])
        return acc
    },new Set())

    const budgetYearlyResults = filteredResults.filter((item:any) => item['Payment Schedule Type'] === 'Yearly')
    let transactionYearlyResults:any = []
    budgetYearlyResults.forEach((item1:any) => {
        let result = transactionsResponseYearly.results.filter((item2:any) => item1['Name'] === item2['Monthly Budget Name'][0] || item1['Name'] === item2['Old Monthly Budget Name'][0])
       transactionYearlyResults.unshift(...result)
    })

    let cost =0;
    let expense=0;
    expenseTypes.forEach((type:any) => {
        cost = budgetYearlyResults.filter((item:any) => item['Expense Type'] === type || item['Old Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        expense = transactionYearlyResults.filter((item:any) => item['Expense Type'].includes(type) || item['Old Expense Type'].includes(type)).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        yearlyBudgetByExpenseType.unshift({type,cost,expense})
    })

    budgetYearlyResults.forEach((item:any) => {
        yearlyBudgetByName.unshift({type:item.Name,cost:item.Cost,expense:transactionYearlyResults.filter((item2:any) => item['Name'] === item2['Monthly Budget Name'][0] || item['Name'] === item2['Old Monthly Budget Name'][0]).reduce((acc:any, item2:any) => { return acc += item2.Cost},0)})
    })

    let yearlyBudget = budgetYearlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)

    let yearlyExpense = transactionYearlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)

    summary = {
        yearlyBudgetByExpenseType,
        yearlyBudgetByName,
        yearlyBudget,   
        yearlyExpense
    }

    return summary
}

export const getPastMonthsBudgetSummary = async ({apiToken, budgetDbId,transactionsDbId,k}:any) => {
    const lastMonthsDates = await getLastKMonthsStartAndEndDates(k);
    let totalBudgetByMonth:any = []
    let totalLivingBudgetByMonth:any = []
    let totalDelightBudgetByMonth:any = []
    let totalSavingsBudgetByMonth:any = []
    let totalGrowthBudgetByMonth:any = []
    let cost:any = {}
    const response = await queryAllNotionDatabase({apiToken,database_id:budgetDbId,  filters: []})
    const filteredResults = response.results
    const monthlyResults = filteredResults.filter((item:any) => item['Payment Schedule Type'] === 'Monthly').filter((item:any) => item['Currently Applicable'] )
    let totalLastMonthCosts = monthlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)
    let expenseTypes = ['Living','Growth','Delight','Savings']
    expenseTypes.forEach((type:any) => {
        cost[type] = monthlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item.Cost},0)
    })


    let totalLastMonthExpenses = 0
    for (const dateRange of lastMonthsDates) {
        const startDate = dateRange.start;
        const endDate = dateRange.end;

        if (startDate && endDate) {
            let currentMonth = format(new Date(startDate), "MMMyy")
            const response = await queryNotionDatabaseByDateRange({apiToken,database_id: transactionsDbId,startDate,endDate})
            let totalExpenses = response.results.filter((item:any) => item.Cost).reduce((acc:any, item:any) => {
                return acc += item.Cost;
            },0)
            let expense:any = {}
            expenseTypes.forEach((type:any) => {
                expense[type] = response.results.filter((item:any) => item['Expense Type'].includes(type) || item['Old Expense Type'].includes(type)).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        
            })
        
            totalBudgetByMonth.unshift({month:currentMonth,cost:totalLastMonthCosts, expense:totalExpenses})
            totalLivingBudgetByMonth.unshift({month:currentMonth,cost:cost['Living'], expense:expense['Living']})
            totalGrowthBudgetByMonth.unshift({month:currentMonth,cost:cost['Growth'], expense:expense['Growth']})
            totalDelightBudgetByMonth.unshift({month:currentMonth,cost:cost['Delight'], expense:expense['Delight']})
            totalSavingsBudgetByMonth.unshift({month:currentMonth,cost:cost['Savings'], expense:expense['Savings']})
            totalLastMonthExpenses += totalExpenses
        }
    }
    
    let summary = {
        totalBudgetByMonth,
        totalLastMonthCosts,
        totalLastMonthExpenses,
        totalLivingBudgetByMonth,
        totalDelightBudgetByMonth,
        totalSavingsBudgetByMonth,
        totalGrowthBudgetByMonth

    }

    return summary
}