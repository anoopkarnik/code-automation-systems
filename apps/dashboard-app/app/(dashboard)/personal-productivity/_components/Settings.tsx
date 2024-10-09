'use client'
import React from 'react'
import DbSelection from '../../../../components/DbSelection'

const Settings = () => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Planner Notion DBs</h1>
        <DbSelection title='Scheduler Notion Db' name='Scheduler' fieldName="schedulerDb"/>
        <DbSelection title='Calendar Notion Db' name='Calendar' fieldName="calendarDb"/>
        <DbSelection title='Eisenhower Matrix Notion Db' name='Eisenhower Matrix' fieldName="eisenhowerMatrixDb"/>
        <DbSelection title='Weekly Planner Notion Db' name='Weekly Planner' fieldName="weeklyPlannerDb"/>
        <DbSelection title='Actions Notion Db' name='Actions' fieldName="actionsDb"/>
        <DbSelection title='Time Tracking Notion Db' name='Time Tracking' fieldName="timeTrackingDb"/>
    </div>
  )
}

export default Settings