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
import { MoreHorizontal, View } from "lucide-react";
import Link from "next/link";


export function ReportDropMenu(props: ReportDropMenuProps) {
  const [loading, setLoading] = useState<boolean>(false);
  

  return loading ? (
    <Loader
      size="xs"
      className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"
    />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuItem className="text-center">
          <Link
            href={props.linkUrl}
            className="flex items-center gap-4 text-gray-500"
          >
            <View size={18} className="text-blue-500" />
            View
          </Link>
        </DropdownMenuItem>
        
        
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ReportDropMenuProps = {
  linkUrl: string;
  
};
