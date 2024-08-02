import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/Card'
import { Skeleton } from '../shadcn/Skeleton'

const HeaderCard = ({title,description,value}:any) => {
  return (
    <Card className="flex flex-col items-start justify-between ">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {value? 
            <div className='text-3xl font-bold'>{value}</div>:
            <Skeleton/>}
        </CardContent>
    </Card>
  )
}

export default HeaderCard