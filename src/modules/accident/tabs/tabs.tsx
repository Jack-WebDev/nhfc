
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { BookText, Bus, CarFront, Eye, FileText, Home, LifeBuoy, PersonStanding, Printer, ShipWheel, Speech } from "lucide-react";
import { fetchAccidentDrivers, fetchAccidentOffices, fetchAccidentPassengers, fetchAccidentPersonObservation, fetchAccidentVehicles, fetchAccidentWitnesses } from "@/apiCalls";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";
import { Passenger } from "./passenger";
import { Witness } from "./witness";
import { PersonObservation } from "./observation";
import { Office } from "./office";


export async function AccidentTabs(props: TabsProps) {

    const {accidentId} = props

    const {drivers} = await fetchAccidentDrivers(accidentId)
    const {vehicles} = await fetchAccidentVehicles(accidentId)
    const {passengers} = await fetchAccidentPassengers(accidentId)
    const {witnesses} = await fetchAccidentWitnesses(accidentId)
    const {offices} = await fetchAccidentOffices(accidentId);
    const {personObservations} = await fetchAccidentPersonObservation(accidentId)


  return (
    <Tabs className="w-full " defaultValue="driver">
      <TabsList className="grid w-full grid-cols-6 ">
        <TabsTrigger value="driver">
          <div className="flex items-center gap-2">
            <LifeBuoy size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Drivers {drivers&& drivers?.length > 0 && `(${drivers.length})`}
            </p>
           
          </div>
        </TabsTrigger>
        <TabsTrigger value="vehicle">
          <div className="flex items-center gap-2">
            <CarFront size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
              Vehicles {vehicles&& vehicles?.length > 0 && `(${vehicles.length})`}
            </p>
            
          </div>
        </TabsTrigger>
        <TabsTrigger value="person">
          <div className="flex items-center gap-2">
            <PersonStanding size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
            Passengers {passengers&& passengers?.length > 0 && `(${passengers.length})`}
            </p>
            
          </div>
        </TabsTrigger>
        <TabsTrigger value="witness">
          <div className="flex items-center gap-2">
            <Eye size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
                Witnesses {witnesses&& witnesses?.length > 0 && `(${witnesses.length})`}
            </p>
            
          </div>
        </TabsTrigger>
        <TabsTrigger value="observation">
          <div className="flex items-center gap-2">
            <Speech size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
                Observations {personObservations&& personObservations?.length > 0 && `(${personObservations.length})`}
            </p>
            
          </div>
        </TabsTrigger>
        <TabsTrigger value="office">
          <div className="flex items-center gap-2">
            <Home size={15} className="text-inherit" />
            <p className="hidden md:flex text-md font-semibold text-inherit">
                Office {offices&& offices?.length > 0 && `(${offices.length})`}
            </p>
            
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="driver" className="bg-white p-4 border-gray-100 border rounded-lg">
        {drivers && <Driver drivers={drivers}/>}
      </TabsContent>
      <TabsContent value="vehicle" className="bg-white p-4 border-gray-100 border rounded-lg">
        {vehicles && <Vehicle vehicles={vehicles}/>}
      </TabsContent>
      <TabsContent value="person" className="bg-white p-4 border-gray-100 border rounded-lg">
        {passengers && <Passenger passengers={passengers} />}
      </TabsContent>
      <TabsContent value="witness" className="bg-white p-4 border-gray-100 border rounded-lg">
        {witnesses && <Witness witnesses={witnesses}/>}
      </TabsContent>
      <TabsContent value="observation" className="bg-white p-4 border-gray-100 border rounded-lg">
        {personObservations && <PersonObservation observations={personObservations} />}
      </TabsContent>
      <TabsContent value="office" className="bg-white p-4 border-gray-100 border rounded-lg">
        {offices && <Office offices={offices} />}
      </TabsContent>
      
    </Tabs>
  );
}

type TabsProps = {
  accidentId: string
};
