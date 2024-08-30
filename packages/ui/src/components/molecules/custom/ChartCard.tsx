import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/Card'
import CustomBarChart from './CustomBarChart'

const ChartCard = ({title,description,chartConfig,chartData,xKey,angle}:any) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <CustomBarChart chartConfig={chartConfig} chartData={chartData} xKey={xKey} angle={angle}/>
        </CardContent>
    </Card>
  )
}

export default ChartCard