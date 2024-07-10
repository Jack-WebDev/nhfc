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

      Approved: 100,
      Rejected: 50,
      Pending: 30,
    },
    {
      month: "February",

      Approved: 150,
      Rejected: 70,
      Pending: 50,
    },
    {
      month: "March",

      Approved: 120,
      Rejected: 80,
      Pending: 37,
    },
    {
      month: "April",

      Approved: 50,
      Rejected: 10,
      Pending: 20,
    },
    {
      month: "May",

      Approved: 130,
      Rejected: 40,
      Pending: 39,
    },
    {
      month: "June",

      Approved: 140,
      Rejected: 50,
      Pending: 24,
    },
  ];

const chartConfig = {
  Approved: {
    label: "Approved",
    color: "#00FF00",
  },
  Rejected: {
    label: "Rejected",
    color: "#FF0000",
  },
  Pending: {
    label: "Pending",
    color: "#FFA500",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="h-1/2 w-1/2 bg-white">
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
        <Bar dataKey="Approved" fill="#00FF00" radius={4} />
        <Bar dataKey="Rejected" fill="#FF0000" radius={4} />
        <Bar dataKey="Pending" fill="#FFA500" radius={4} />

      </BarChart>
    </ChartContainer>
  )
}
