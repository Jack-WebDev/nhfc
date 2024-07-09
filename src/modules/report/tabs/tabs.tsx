
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { BookText, Bus, Container, FileText, ShipWheel, Users2 } from "lucide-react";
import { BatchManagement } from "./batchManagement";
import { BookManagement } from "./bookManagement";
import { UserManagement } from "./userManagement";



export async function ReportTabs(props: TabsProps) {


  return (
    <Tabs className="w-full" defaultValue="batch-management">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="batch-management">
          <div className="flex items-center gap-2">
            <Container size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Batch management
            </p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="book-management">
          <div className="flex items-center gap-2">
            <BookText size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Book management
            </p>
          </div>
        </TabsTrigger>
        
      </TabsList>

      <TabsContent value="batch-management" className="bg-white p-4 border-gray-100 border rounded-lg">
        <BatchManagement />
      </TabsContent>
      <TabsContent value="book-management" className="bg-white p-4 border-gray-100 border rounded-lg">
        <BookManagement />
      </TabsContent>
      
    </Tabs>
  );
}

type TabsProps = {
  // documents: DocumentType[];
  // vehicles: VehicleType[];

  // add driver type
};
