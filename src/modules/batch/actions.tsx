import { Button, Dialog, DialogContent, DialogTrigger } from "@/components";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";

export function BookActions(props: UserActionsProps) {
  const { type } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="main" className="flex items-center text-white">
            <Plus size={20} className="text-white mr-2" />
            <span className="text-white font-medium font-md">New batch</span>
          </Button>
          
        
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full  ">
        <span className="text-center font-bold text-lg mb-2 pb-2 border-b border-gray-50">
          Add books
        </span>

        <CreateForm type={type}/>
      </DialogContent>
    </Dialog>
  );
}

type UserActionsProps = {
  type: number;
  
};
