import Image from 'next/image'
import React from 'react'

const Overview = () => {
  return (
    <div className='h-screen flex flex-col items-center my-10 '>
      <h1 className='text-4xl font-medium my-4 text-center'>Still In Construction</h1>
      <Image src="/construction.gif" alt="Overview" width={500} height={500} />
    </div>
  )
}

export default Overview