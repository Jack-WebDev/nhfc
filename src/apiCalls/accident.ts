"use server";

import { AccidentType, AreaType } from "@/schema/accident";
import db from "@/utils/connect";
import { AccidentVisibility } from "@prisma/client";

export async function fetchAccidents() {
  try {
    const accidents = await db.accident.findMany({
      where: {
        visibility:  AccidentVisibility.Vissible
      }
    });
    return { error: null, accidents: accidents as unknown as AccidentType[] };
  } catch (error) {
    return { error: error, accidents: null };
  }
}
export async function fetchSingleAccident(accidentId: string) {
  try {
    const accident = await db.accident.findUnique({
      where: {
        id: accidentId,
      },
    });
    return { error: null, accident: accident as unknown as AccidentType };
  } catch (error) {
    return { error: error, accidents: null };
  }
}

export async function fetchAccidentArea(accidentId: string) {
  try {
    const area = await db.area.findFirst({
      where: {
        accidentId: accidentId,
      },
    });
    return { area: area as unknown as AreaType };
  } catch (error) {
    return { area: null };
  }
}

export async function fetchAccidentVehicles(accidentId: string) {
  try {
    const vehicles = await db.vehicle.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { vehicles: vehicles };
  } catch (error) {
    return { vehicles: null };
  }
}
export async function fetchAccidentDrivers(accidentId: string) {
  try {
    const drivers = await db.driver.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { drivers: drivers };
  } catch (error) {
    return { drivers: null };
  }
}
export async function fetchAccidentPassengers(accidentId: string) {
  try {
    const passengers = await db.passenger.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { passengers: passengers };
  } catch (error) {
    return { passengers: null };
  }
}
export async function fetchAccidentOffices(accidentId: string) {
  try {
    const offices = await db.office.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { offices: offices };
  } catch (error) {
    return { offices: null };
  }
}
export async function fetchAccidentWitnesses(accidentId: string) {
  try {
    const witnesses = await db.witness.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { witnesses: witnesses };
  } catch (error) {
    return { witnesses: null };
  }
}
export async function fetchAccidentGeneralDetails(accidentId: string) {
  try {
    const generalDetails = await db.generalDetail.findFirst({
      where: {
        accidentId: accidentId,
      },
    });
    return { generalDetails: generalDetails };
  } catch (error) {
    return { generalDetails: null };
  }
}
export async function fetchAccidentPersonObservation(accidentId: string) {
  try {
    const personObservations = await db.personObservation.findMany({
      where: {
        accidentId: accidentId,
      },
    });
    return { personObservations: personObservations };
  } catch (error) {
    return { personObservations: null };
  }
}

export async function fetchAccidentReportByAccidentType(type: string) {
  try {
    const stats = await db.accident.aggregate({
      _sum: {
        numberOfDead: true,
        numberOfNotInjured: true,
        numberOfSeriouslyInjured: true,
        numberOfSlightlyInjured: true,
      },

      where: {
        accidentType: type,
      },
    });
    return stats._sum;
  } catch (error) {
    return {
      numberOfDead: 0,
      numberOfSeriouslyInjured: 0,
      numberOfSlightlyInjured: 0,
      numberOfNotInjured: 0,
    };
  }
}
