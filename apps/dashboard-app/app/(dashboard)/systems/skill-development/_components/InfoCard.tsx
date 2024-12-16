import React from 'react'

const InfoCard = ({name,value}:any) => {
  return (
    <div className='flex flex-col items-center justify-center border-border border-2 p-2 bg-secondary rounded-xl  '>
        <div className='font-extralight'>{name}</div>
        <div>{value}</div>
    </div>
  )
}

export default InfoCard