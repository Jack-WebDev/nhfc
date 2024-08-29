"use client";
import { Badge, Button } from "@/components";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type RegisterRiskSChema = {
  id: string;
  priority: string;
  riskType: string;
  description: string;
  riskOwner: string;
};

export default function RegsiterRisk() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<RegisterRiskSChema[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRiskRegister = async () => {
      const res = await axios.get("/api/erm");
      // console.log(res.data)
      setData(res.data);
    };

    fetchRiskRegister();
  }, []);

  const handleRegisterRisk = (risk: RegisterRiskSChema) => {
    router.push(`/dashboard/erm/register-risk/${risk.id}`);
  };

  const columns: ColumnDef<RegisterRiskSChema>[] = [
    {
      accessorKey: "id",
      header: "Risk ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority: string = row.getValue("priority");
        let variant;

        switch (priority) {
          case "moderate":
            variant = "yellow";
            break;
          case "low":
            variant = "green";
            break;
          case "high":
            variant = "red";
            break;
          default:
            variant = "yelllow";
        }

        return (
          <div className="capitalize">
            <Badge className={`bg-${variant}-500 text-white`}>{priority}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "riskType",
      header: "Risk Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("riskType")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "riskOwner",
      header: "Risk Owner",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("riskOwner")}</div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const risk = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleRegisterRisk(risk)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Download File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 6,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "red" },
    { browser: "safari", visitors: 200, fill: "orange" },
    { browser: "firefox", visitors: 287, fill: "orange" },
    { browser: "edge", visitors: 173, fill: "green" },
    { browser: "other", visitors: 190, fill: "orange" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div>
      <div className="risk_overview flex justify-evenly items-center w-full">
        <div className="grid justify-items-center border-r-2 border-gray-400 pr-12">
          <h2>Total Risks</h2>
          <h3 className="text-5xl font-semibold">87</h3>
        </div>
        <div className="grid justify-items-center border-r-2 border-gray-400 pr-12">
          <h2>Treatment Activities</h2>
          <h3 className="text-5xl font-semibold">128</h3>
        </div>
        <div className="grid justify-items-center border-r-2 border-gray-400 pr-12">
          <h2>Treatment Progress</h2>
          <h3 className="text-5xl font-semibold">51%</h3>
        </div>
        <Card className="flex flex-col bg-transparent shadow-none border-none">
          <CardHeader className="items-center pb-0">
            <CardTitle>Inherent Risks</CardTitle>
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
                  dataKey="visitors"
                  nameKey="browser"
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
                              47%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            ></tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border">
        <Table className="bg-white rounded-xl">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
