'use client'
import React from 'react'
import DbSelection from '../../../../components/DbSelection'

const Settings = () => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Knowledge Base Notion DBs</h1>
        <div className='flex flex-wrap'>
        <DbSelection title='Areas Notion Db' name='Areas' fieldName="areasDb"/>
        <DbSelection title='Skill Treees Notion Db' name='Skill Trees' fieldName="skillTreesDb"/>
        </div>
    </div>
  )
}

export default Settings