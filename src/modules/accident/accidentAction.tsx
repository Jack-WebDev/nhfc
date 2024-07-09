import { Button, Dialog, DialogContent, DialogTrigger } from "@/components";
import { Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";


export function AccidentActions() {
 

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="main" className="flex items-center text-white">
            <Plus size={20} className="text-white mr-2" />
            <span className="text-white font-medium font-md">Add new</span>
          </Button>
          
        
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full  min-w-[800px] max-w-max">
        <span className="text-center font-bold text-lg mb-2 pb-2 border-b border-gray-50 text-gray-500">
          Accident information
        </span>
        <CreateForm />
     
      </DialogContent>
    </Dialog>
  );
}
