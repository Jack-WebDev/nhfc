
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { BookText, Bus, FileText, ShipWheel } from "lucide-react";
import { HandWritten } from "./handWritten";
import { Section56 } from "./section56";
import { Section56ByLaw } from "./section56-ByLaw";
import { fetchBatchByType } from "@/apiCalls/batch";


export async function BatchTabs(props: TabsProps) {

  const { batch : batch10} = await fetchBatchByType(10);
  const { batch: batch50 } = await fetchBatchByType(50);
  const { batch: batch51 } = await fetchBatchByType(51);


  return (
    <Tabs className="w-full" defaultValue="10">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="10">
          <div className="flex items-center gap-2">
            <BookText size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              341 Hand written ({batch10.length})
            </p>
            <p className="flex md:hidden"> 341  ({batch10.length})</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="50">
          <div className="flex items-center gap-2">
            <BookText size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Section 56  ({batch50.length})
            </p>
            <p className="flex md:hidden"> 56  ({batch10.length})</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="51">
          <div className="flex items-center gap-2">
            <BookText size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
            Section 56 By-Law  ({batch51.length})
            </p>
            <p className="flex md:hidden">Law  ({batch10.length})</p>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="10" className="bg-white p-4 border-gray-100 border rounded-lg">
        <HandWritten />
      </TabsContent>
      <TabsContent value="50" className="bg-white p-4 border-gray-100 border rounded-lg">
        <Section56 />
      </TabsContent>
      <TabsContent value="51" className="bg-white p-4 border-gray-100 border rounded-lg">
        <Section56ByLaw />
      </TabsContent>
    </Tabs>
  );
}

type TabsProps = {
  // documents: DocumentType[];
  // vehicles: VehicleType[];

  // add driver type
};
