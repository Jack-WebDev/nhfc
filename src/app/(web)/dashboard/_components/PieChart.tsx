"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { category: "Social Housing", value: 275, fill: "#FF5733" }, // bright red
    { category: "Private Rental", value: 200, fill: "#33FF57" }, // bright green
    { category: "Bridging Finance", value: 187, fill: "#3357FF" }, // bright blue
    { category: "Subsidy Housing", value: 173, fill: "#FF33FF" }, // bright pink
    { category: "Incremental Housing", value: 90, fill: "#FFFF33" }, // bright yellow
  ]
  
  const chartConfig = {
    value: {
      label: "Value",
    },
    "Social Housing": {
      label: "Social Housing",
      color: "#FF5733", // bright red
    },
    "Private Rental": {
      label: "Private Rental",
      color: "#33FF57", // bright green
    },
    "Bridging Finance": {
      label: "Bridging Finance",
      color: "#3357FF", // bright blue
    },
    "Subsidy Housing": {
      label: "Subsidy Housing",
      color: "#FF33FF", // bright pink
    },
    "Incremental Housing": {
      label: "Incremental Housing",
      color: "#FFFF33", // bright yellow
    },
  } satisfies ChartConfig
  

export function PieChartComponent() {
  const totalvalue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">

      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalvalue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          value
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
