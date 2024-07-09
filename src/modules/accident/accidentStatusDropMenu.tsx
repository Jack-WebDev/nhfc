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
import { Download, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components";
import axios from "axios";
import url from "@/lib/apiUrl";

export function AccidentStatusDropMenu(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { accidentId, status } = props;

  const handleAction = async (action: string) => {
    setLoading(true);

    try {
      const res = await axios.patch(`${url}/accidents/${accidentId}`, {
        status: action,
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
          : `Failed to update accident `,
      });
    }
  };
  return loading ? (
    <Loader
      size="xs"
      className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"
    />
  ) : (
    <div className="w-fil h-fil ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>

         {status === "Incomplete" && <DropdownMenuItem className="text-center flex items-center gap-4 text-gray-500 cursor-pointer hover:bg-green-500 hover:text-white"
          onClick={() => handleAction("Complete")}
          >
            Mark as complete
          </DropdownMenuItem>}

          {status === "Complete" && <DropdownMenuItem className="text-center flex items-center gap-4 text-gray-500 cursor-pointer hover:bg-orange-400 hover:text-white"
            onClick={() => handleAction("Incomplete")}
          >
            Mark as Incomplete
          </DropdownMenuItem>}

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type Props = {
  accidentId: string;
  status: string;
};
