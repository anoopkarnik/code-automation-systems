'use client'
import React from 'react'
import DbSelection from './DbSelection'

const Settings = () => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Financial Notion DBs</h1>
        <DbSelection title='Accounts Notion Db' name='Accounts' fieldName="accountsDb"/>
        <DbSelection title='Transactions Notion Db'  name='Transactions' fieldName="transactionsDb"/>
        <DbSelection title='Budget Notion Db' name='MonthlyBudget' fieldName="monthlyBudgetDb"/>
        <DbSelection title='Budget Plan Notion Db'  name='BudgetPlan' fieldName="budgetPlanDb"/>
        <DbSelection title='Financial Goals Notion Db' name='FinancialGoals' fieldName="financialGoalsDb"/>
          
    </div>
  )
}

export default Settings