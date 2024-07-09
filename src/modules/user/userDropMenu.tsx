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
import { AlertCircle, Check, MoreHorizontal, Trash2, View } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components";
import { UserType } from "@/schema";
import url from "@/lib/apiUrl";

export function UserDropMenu(props: UserDropMenuProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { user } = props;

  const deleteAction = async () => {
    setLoading(true);

    try {
      const res = await axios.delete(`${url}/users/${user.id}`);
      setLoading(false);
      toast({
        variant: "success",
        title: "Success",
        description: `${res.data.message}`,
      });
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 1000)
      );
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast({
        variant: "error",
        title: "Error!",
        description: error?.response?.data?.message
          ? error?.response?.data?.message
          : `Failed to delete user `,
      });
    }
  };
  const statusAction = async (status: string) => {
    setLoading(true);

    try {
      const res = await axios.patch(`${url}/users/${user.id}`, {
        status: status,
      });
      setLoading(false);
      toast({
        variant: "success",
        title: "Success",
        description: `${res.data.message}`,
      });
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 1000)
      );
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "error",
        title: "Error!",
        description: error?.response?.data?.message
          ? error?.response?.data?.message
          : `Failed to update user`,
      });
    }
  };

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
        {user.status !== "Active" ? (
          <DropdownMenuItem
            className="text-center flex items-center gap-4 text-gray-500 cursor-pointer"
            onClick={() => statusAction("Active")}
          >
            <Check size={18} className="text-green-600" />
            Activate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="text-center flex items-center gap-4 text-gray-500 cursor-pointer"
            onClick={() => statusAction("Inactive")}
          >
            <AlertCircle size={18} className="text-red-500" />
            Deactivate
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type UserDropMenuProps = {
  linkUrl: string;
  user: UserType;
};
