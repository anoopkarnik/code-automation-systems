'use client'
import React from 'react'
import DbSelection from '../../../../components/DbSelection'

const Settings = () => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Projects DBs</h1>
        <DbSelection title='Projects Notion Db' name='Projects' fieldName="projectsDb"/>
        <DbSelection title='Blogs Notion Db'  name='Blogs' fieldName="blogsDb"/>
        <DbSelection title='Place of Work Notion Db' name='Place Of Work' fieldName="placeOfWorkDb"/>
    </div>
  )
}

export default Settings