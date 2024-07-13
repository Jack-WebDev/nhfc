"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  {
    month: "January",
    "Social Housing Finance": 100,
    "Private Rental Housing Finance": 50,
    "Contract Bridging Finance": 30,
    "Affordable Housing Bridging Finance": 40,
    "Incremental Housing Finance": 20,
  },
  {
    month: "February",
    "Social Housing Finance": 150,
    "Private Rental Housing Finance": 70,
    "Contract Bridging Finance": 50,
    "Affordable Housing Bridging Finance": 60,
    "Incremental Housing Finance": 30,
  },
  {
    month: "March",
    "Social Housing Finance": 120,
    "Private Rental Housing Finance": 80,
    "Contract Bridging Finance": 37,
    "Affordable Housing Bridging Finance": 45,
    "Incremental Housing Finance": 25,
  },
  {
    month: "April",
    "Social Housing Finance": 50,
    "Private Rental Housing Finance": 30,
    "Contract Bridging Finance": 20,
    "Affordable Housing Bridging Finance": 25,
    "Incremental Housing Finance": 15,
  },
  {
    month: "May",
    "Social Housing Finance": 130,
    "Private Rental Housing Finance": 90,
    "Contract Bridging Finance": 39,
    "Affordable Housing Bridging Finance": 50,
    "Incremental Housing Finance": 20,
  },
  {
    month: "June",
    "Social Housing Finance": 140,
    "Private Rental Housing Finance": 120,
    "Contract Bridging Finance": 24,
    "Affordable Housing Bridging Finance": 35,
    "Incremental Housing Finance": 18,
  },
];

const chartConfig = {
  "Social Housing Finance": {
    label: "Social Housing Finance",
    color: "#00FF00",
  },
  "Private Rental Housing Finance": {
    label: "Private Rental Housing Finance",
    color: "#FF0000",
  },
  "Contract Bridging Finance": {
    label: "Contract Bridging Finance",
    color: "#FFA500",
  },
  "Affordable Housing Bridging Finance": {
    label: "Affordable Housing Bridging Finance",
    color: "#0000FF",
  },
  "Incremental Housing Finance": {
    label: "Incremental Housing Finance",
    color: "#800080",
  },
} satisfies ChartConfig

export function FinanceSolutionsChartComponent() {
  return (
    <ChartContainer config={chartConfig} className=" bg-white">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Social Housing Finance" fill="#00FF00" radius={4} />
        <Bar dataKey="Private Rental Housing Finance" fill="#FF0000" radius={4} />
        <Bar dataKey="Contract Bridging Finance" fill="#FFA500" radius={4} />
        <Bar dataKey="Affordable Housing Bridging Finance" fill="#0000FF" radius={4} />
        <Bar dataKey="Incremental Housing Finance" fill="#800080" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
