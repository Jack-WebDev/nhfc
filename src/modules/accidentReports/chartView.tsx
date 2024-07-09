"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export function ChartView(props: ChartViewProps) {
    const {fatal, serious, slight, noInjury} = props;

    const data = [
        {
          name: "Fatal",
          total: fatal,
        },
        {
          name: "Serious",
          total: serious,
        },
        {
          name: "Slight",
          total: slight,
        },
        {
          name: "No injury",
          total: noInjury,
        },
      ];
  return (
    <ResponsiveContainer className="max-w-[400px] h-fit min-h-[300px]">
      <BarChart
        width={50}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
       
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="total"
          fill="#3b82f6"
          activeBar={<Rectangle fill="#3b82f6" stroke="#3b82f6" />}
        />
        
      </BarChart>
    </ResponsiveContainer>
  );
}

type ChartViewProps = {
    fatal: number,
    serious: number,
    slight: number,
    noInjury: number,
}
