import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components";
import { OfficeOccurenceForm } from "../forms/office/occurence";
import { OfficereportedForm } from "../forms/office/reported";


export const OfficeFormTabs = () => {
  return (
    <Tabs className="w-full " defaultValue="occured">
      <TabsList className="grid w-full grid-cols-2 rounded-none mb-4">
        <TabsTrigger value="occured" className="rounded-none ">
          <div className="flex items-center gap-2">
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Office (where the accident occured)
            </p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="reported" className="rounded-none ">
          <div className="flex items-center gap-2">
            <p className="hidden md:flex text-md font-semibold text-inherit">
            Office (where the accident was reported)
            </p>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="occured"
        className="bg-white p-4 border-gray-100 border rounded-lg"
      >
       <OfficeOccurenceForm />
      </TabsContent>
      <TabsContent
        value="reported"
        className="bg-white p-4 border-gray-100 border rounded-lg"
      >
      <OfficereportedForm />
      </TabsContent>
    </Tabs>
  );
};
