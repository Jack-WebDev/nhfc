import { AccidentType } from "@/schema/accident";
import db from "@/utils/connect";


export async function fetchAccidentPerVehicleTypeTotal() {
    try {
        const vehicles = await db.vehicle.findMany();
    
        // Map througn each vehicle and find its accident
        let accidents: AccidentType[] = [];
        let fatal = 0;
        let serious = 0;
        let slight = 0;
        let noInjury = 0;
    
        for (let i = 0; i < vehicles.length; i++) {
          const accident = await db.accident.findFirst({
            where: {
              id: vehicles[i].accidentId,
            },
          });
    
          accident && accidents.push(accident);
        }
    
        for (let i = 0; i < accidents.length; i++) {
          fatal += accidents[i].numberOfDead;
          serious += accidents[i].numberOfSeriouslyInjured;
          slight += accidents[i].numberOfSlightlyInjured;
          noInjury += accidents[i].numberOfNotInjured;
        }
    
        return {
          fatal: fatal,
          serious: serious,
          slight: slight,
          noInjury: noInjury,
        };
    
        
      }
      catch {

        return {
            fatal: 0,
            serious: 0,
            slight: 0,
            noInjury: 0,
          };

      }
}