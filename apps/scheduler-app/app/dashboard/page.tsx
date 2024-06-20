'use client'
import React, { useEffect } from 'react'
import { initializeScheduler } from '../../lib/scheduler'

const page = () => {
  useEffect(() =>{
    initializeScheduler()
  },[])
  return (
    <div className='flex '>
      <div>1</div>
      <div>2</div>
    </div>
  )
}

export default page