'use client'
import React from 'react'
import DbSelection from '../../../../components/DbSelection'

const Settings = () => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Personal Info DBs</h1>
        <DbSelection title='Social Sphere Notion Db' name='Social Sphere' fieldName="socialSphereDb"/>
        <DbSelection title='Passwords Notion Db' name='Passwords' fieldName="passwordsDb"/>
        <DbSelection title='Journal Notion Db' name='Journal' fieldName="journalDb"/> 
        <DbSelection title='Inventory Notion Db' name='Inventory' fieldName="inventoryDb"/>
        <DbSelection title='Status Notion Db' name='Status' fieldName="statusDb"/>
        <DbSelection title='Goals Notion Db' name='Goals' fieldName="goalsDb"/>
        <DbSelection title='Rewards Notion Db' name='Rewards' fieldName="rewardsDb"/>
        <DbSelection title='Punishments Notion Db' name='Punishments' fieldName="punishmentsDb"/>
    </div>
  )
}

export default Settings