'use client'
import React from 'react'
import { useScheduler } from '../../hooks/useScheduler'

const page = () => {
  useScheduler()
  return (
    <div className='flex '>
      <div>1</div>
      <div>2</div>
    </div>
  )
}

export default page