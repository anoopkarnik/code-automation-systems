import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/Card'

const HeaderCard = ({title,description,value}:any) => {
  return (
    <Card className="flex flex-col items-center justify-between ">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className='text-3xl font-bold'>{value}</div>
        </CardContent>
    </Card>
  )
}

export default HeaderCard