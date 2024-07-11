'use server'
import { getNotionByUserId, updateNotionDb} from "@repo/prisma-db/repo/notion";
import { getNotionDatabaseProperties, queryAllNotionDatabase, queryNotionDatabase } from '@repo/notion/notion-client'
import { format } from "date-fns";

export const getDatabases = async (token: string) => {
    const response = await fetch('https://api.notion.com/v1/search', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22'
        },
        body: JSON.stringify({
            filter: {
                value: 'database',
                property: 'object'
            }
        })
    });
    const data = await response.json();
    return data.results;
}

export const getNotionInfo = async (userId: string) => {
    const notion_info = await getNotionByUserId(userId)
    return notion_info;
}

export const updateNotionDatabase = async (notionId: string, field:string, value: any) => {
    const notionDb = await updateNotionDb({id:notionId, field, value} );
    return notionDb;
}

export const queryNotionDatabaseAction = async ({apiToken,database_id}:any) => {
    const response = await queryNotionDatabase({apiToken,database_id,  filters: []   })
    return response;
}

export const queryNotionDatabaseProperties = async ({apiToken,database_id}:any) => {
    const response = await getNotionDatabaseProperties({apiToken,database_id })
    return response;
}

export const queryNotionDatabaseByDateRange = async ({apiToken,database_id,startDate,endDate}:any) => {
    const filters = [
        {
            name: 'created_time',
            type: 'created_time',
            condition: 'on_or_after',
            value: startDate
        },
        {
            name: 'created_time',
            type: 'created_time',
            condition: 'on_or_before',
            value: endDate
        }
    ]
    const response = await queryAllNotionDatabase({apiToken,database_id,  filters: filters})
    return response;
}

export const getDateSpecificFinancialSummary = async ({apiToken, transactionsDbId, startDate, endDate }:any) => {
    const response = await queryNotionDatabaseByDateRange({apiToken,database_id: transactionsDbId,startDate,endDate})
    let totalExpensesByType:any = {}
    let totalExpensesByBudget:any = {}
    let totalExpensesByExpenseType:any = []
    let totalExpensesByBudgetType:any = [] 

    let expenseTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Expense Type'][0])
        acc.add(item['Old Expense Type'][0])
        return acc
    },new Set())

    let monthlyBudgetTypes =  response.results.reduce((acc:any, item:any) => {
        acc.add(item['Monthly Budget Name'][0])
        acc.add(item['Old Monthly Budget Name'][0])
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

export const getBudgetSummary = async ({apiToken, budgetDbId}:any) => {
    const response = await queryAllNotionDatabase({apiToken,database_id:budgetDbId,  filters: []})
    
    const filteredResults = response.results.filter((item:any) => item['Currently Applicable'] === true )

    let summary:any = {}
    let monthlyBudgetByExpenseType:any = []
    let yearlyBudgetByExpenseType:any = []
    let monthlyBudgetByName:any = []
    let yearlyBudgetByName:any = []

    let expenseTypes = filteredResults.reduce((acc:any, item:any) => {
        acc.add(item['Expense Type'])
        return acc
    },new Set())

    const monthlyResults = filteredResults.filter((item:any) => item['Payment Schedule Type'] === 'Monthly')
    const yearlyResults = filteredResults.filter((item:any) => item['Payment Schedule Type'] === 'Yearly')

    let cost =0;
    let expense=0;
    expenseTypes.forEach((type:any) => {
        cost = monthlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        expense = monthlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)
        monthlyBudgetByExpenseType.unshift({type,cost,expense})
    })

    cost =0;
    expense=0;
    expenseTypes.forEach((type:any) => {
        cost = yearlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item.Cost},0)
        expense = yearlyResults.filter((item:any) => item['Expense Type'] === type).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)
        yearlyBudgetByExpenseType.unshift({type,cost,expense})
    })

    monthlyResults.forEach((item:any) => {
        monthlyBudgetByName.unshift({type:item.Name,cost:item.Cost,expense:item['Current Month Transaction Sum']})
    })

    yearlyResults.forEach((item:any) => {
        yearlyBudgetByName.unshift({type:item.Name,cost:item.Cost,expense:item['Current Month Transaction Sum']})
    })

    let monthlyBudget = monthlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)
    let yearlyBudget = yearlyResults.reduce((acc:any, item:any) => { return acc += item.Cost},0)
    let monthlyExpense = monthlyResults.filter((item:any)=>item['Current Month Transaction Sum']).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)
    let yearlyExpense = yearlyResults.filter((item:any)=>item['Current Month Transaction Sum']).reduce((acc:any, item:any) => { return acc += item['Current Month Transaction Sum']},0)


    summary = {
        monthlyBudgetByExpenseType,
        yearlyBudgetByExpenseType,
        monthlyBudgetByName,
        yearlyBudgetByName,
        monthlyBudget,
        yearlyBudget,   
        monthlyExpense,
        yearlyExpense
    }

    return summary
}
