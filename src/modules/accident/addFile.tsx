import { Button, Dialog, DialogContent, DialogTrigger } from "@/components";
import { Plus, Upload } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { DriverForm } from "./forms/driverForm";
import { AccidentFileForm } from "./forms/accidentFileForm";


export function AddAccidentFile() {
 

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="ghost" className="shadow-lg text-xs flex items-center gap-2 bg-green-600 text-white h-fit  hover:bg-green-500 hover:text-white">
            <Upload size={15} className="text-white mr-2" />
            <span className="text-white font-normal text-xs">Add file</span>
          </Button>
          
        
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full  min-w-[400px] max-w-max flex flex-col items-center">
        <span className="text-center font-bold text-lg mb-2 pb-2 border-b border-gray-50 text-gray-500">
          Upload accident form
        </span>
        <AccidentFileForm />
     
      </DialogContent>
    </Dialog>
  );
}
