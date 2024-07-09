'use client'

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
import { AlertCircle, Check, MoreHorizontal, Trash2, View } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components";
import { BatchType, UserType } from "@/schema";
import url from "@/lib/apiUrl";


export function BatchDropMenu  (props: BatchDropMenuProps)  {

    const [loading, setLoading] = useState<boolean>(false)
    const {toast} = useToast();

    const {batch} = props

    const deleteAction = async() => {
        setLoading(true)
        
        try {
            const res = await axios.delete(`${url}/batch/${batch.batchId}`);
            setLoading(false);  
            toast({
                variant: "success",
                title: "Success",
                description: `${res.data.message}`
            })
            await new Promise((resolve) =>
                setTimeout(() => {
                location.reload();
                }, 1000)
            );
            
          } catch (error:any) {
            console.log(error)
            setLoading(false);
            toast({
                variant: "error",
                title: "Error!",
                description: error?.response?.data?.message ? error?.response?.data?.message :`Failed to delete batch `
            })
          }
    }
 
  return (
    loading? <Loader size="xs" className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"/> :
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="text-center"
        >
            <Link href={props.linkUrl} className="flex items-center gap-4 text-gray-500">
                <View size={18} className="text-blue-500"/>
                View
            </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem
          className="text-center flex items-center gap-4 text-gray-500 cursor-pointer"
          onClick={() => deleteAction()}
        >
           
            <Trash2 size={18} className="text-red-500"/> 
            Delete
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




type BatchDropMenuProps = {
    linkUrl: string,
    batch: BatchType
};
