"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  { month: "January", loanDisbursements: 186 },
  { month: "February", loanDisbursements: 305 },
  { month: "March", loanDisbursements: 237 },
  { month: "April", loanDisbursements: 73 },
  { month: "May", loanDisbursements: 209 },
  { month: "June", loanDisbursements: 214 },
]

const chartConfig = {
  loanDisbursements: {
    label: "Loan Disbursements",
    color: "#4682B4",
  },
} satisfies ChartConfig

export function LineChartComponent() {
  return (
    <Card>
      <CardHeader>
      <CardTitle>Loan Disbursement</CardTitle>
      <CardDescription>A graph showing the disbursement of loans over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="loanDisbursements"
              type="linear"
              stroke="var(--color-loanDisbursements)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
