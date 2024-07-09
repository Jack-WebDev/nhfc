import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components";
import { LifeBuoy, CarFront, PersonStanding, Eye, Speech } from "lucide-react";
import { InjuredPassenger } from "../forms/injuredPassengers";
import { PassengerNotEnjured } from "../forms/passengersNotInjured";

export const PassengerFormTabs = () => {
  return (
    <Tabs className="w-full " defaultValue="unInjured">
      <TabsList className="grid w-full grid-cols-2 rounded-none mb-4">
        <TabsTrigger value="injured" className="rounded-none ">
          <div className="flex items-center gap-2">
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Injured passenger
            </p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="unInjured" className="rounded-none ">
          <div className="flex items-center gap-2">
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Uninjured passenger
            </p>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="injured"
        className="bg-white p-4 border-gray-100 border rounded-lg"
      >
        <InjuredPassenger />
      </TabsContent>
      <TabsContent
        value="unInjured"
        className="bg-white p-4 border-gray-100 border rounded-lg"
      >
        <PassengerNotEnjured />
      </TabsContent>
    </Tabs>
  );
};
