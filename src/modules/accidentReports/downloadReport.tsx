"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Loader,
} from "@/components";

import { Button } from "@/components";
import {
  AlertCircle,
  Check,
  Download,
  MoreHorizontal,
  Trash2,
  View,
} from "lucide-react";
import {useDownloadExcel} from "react-export-table-to-excel"
import { useToast } from "@/components";

export function ReportDropMenu() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

//   const {onDownload} = useDownloadExcel({
//     currentTableRef: props.tableRef,
//     filename: props.fileName,
//     sheet: props.title,
//   })

  return loading ? (
    <Loader
      size="xs"
      className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"
    />
  ) : (
    <div className="w-fil h-fil absolute top-5 right-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>

          <DropdownMenuItem className="text-center flex items-center gap-4 text-gray-500 cursor-pointer">
            <Download size={18} className="text-green-600" />
            Download pdf
          </DropdownMenuItem>

          <DropdownMenuItem className="text-center flex items-center gap-4 text-gray-500 cursor-pointer">
            <Download size={18} className="text-green-600" />
            Download csv
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type Props = {
  tableRef: any;
  title: string
  fileName: string
};
