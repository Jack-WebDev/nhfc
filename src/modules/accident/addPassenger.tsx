import { Button, Dialog, DialogContent, DialogTrigger } from "@/components";
import { Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { DriverForm } from "./forms/driverForm";
import { PassengerForm } from "./forms/passengerForm";


export function PassengerActions() {
 

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="main" className="flex items-center text-white p-2 h-fit w-fit ">
            <Plus size={15} className="text-white mr-2" />
            <span className="text-white font-normal text-xs">Add passenger</span>
          </Button>
          
        
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full  min-w-[800px] max-w-max">
        <span className="text-center font-bold text-lg mb-2 pb-2 border-b border-gray-50 text-gray-500">
          Passenger information
        </span>
        <PassengerForm />
     
      </DialogContent>
    </Dialog>
  );
}
