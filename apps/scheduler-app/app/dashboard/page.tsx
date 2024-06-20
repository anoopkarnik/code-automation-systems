'use client'
import React from 'react'
import { useScheduler } from '../../hooks/useScheduler'

const Page = () => {
  useScheduler()
  return (
    <div className='flex '>
      <div>1</div>
      <div>2</div>
    </div>
  )
}

export default Page