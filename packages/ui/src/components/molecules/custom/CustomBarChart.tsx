"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../shadcn/Chart"


const CustomBarChart = ({chartConfig,chartData,xKey,angle}:any) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          tickMargin={angle === 'horizontal' ? 10 : 50}
          axisLine={false}
          angle={angle === 'horizontal' ? 0 : 270}
          height={angle === 'horizontal' ? 50 : 100}
          padding={"no-gap"}
          orientation={angle === "horizontal" ? "bottom" : "top"}
          interval={0} // Ensures all labels are shown
          dy={angle === 'horizontal' ? 0 : 10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(chartConfig).map((key: string,index) => (
            <Bar key={key} dataKey={key}  fill={`hsl(var(--chart-${index+1}))`} radius={4} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export default CustomBarChart;