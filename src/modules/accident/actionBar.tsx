import React from 'react'
import { DriverActions } from './addDriver'
import { VehicleActions } from './addVehicle'
import { Witnessctions } from './addWitness'
import { PassengerActions } from './addPassenger'
import { ObservationActions } from './addObservation'
import { fetchAccidentDrivers, fetchAccidentOffices, fetchAccidentPassengers, fetchAccidentPersonObservation, fetchAccidentVehicles, fetchAccidentWitnesses } from '@/apiCalls'
import { OfficeActions } from './addOffice'
import { pass } from '@/notifications'

export const ActionBar = async (props: ActionBarProps) => {

  const accidentId = props.accidentId
  
  const {drivers} = await fetchAccidentDrivers(accidentId)
  const {vehicles} = await fetchAccidentVehicles(accidentId)
  const {passengers} = await fetchAccidentPassengers(accidentId)
  const {offices} = await fetchAccidentOffices(accidentId)
  const {personObservations} = await fetchAccidentPersonObservation(accidentId)
  const {witnesses} = await fetchAccidentWitnesses(accidentId)
  return (
    <div className='flex items-center gap-6  self-end w-fit'>
      {(drivers && drivers.length < 2) && <DriverActions />}
      {(vehicles && vehicles.length < 2) &&<VehicleActions />}
      {(passengers && passengers.length < 7) &&<PassengerActions />}
      {(witnesses && witnesses.length < 2) &&<Witnessctions />}
      {(personObservations && personObservations.length < 2) &&<ObservationActions />}
      {(offices && offices.length < 2) && <OfficeActions />}
    </div>
  )
}

type ActionBarProps = {
  accidentId: string;
}

