import { FormInput, FormRadio, FormSelect, FormTextArea } from "@/components";
import React from "react";
import {weekDays } from "..";

export const AccidentInfo = (props: AccidentInfoProps) => {

  const form = props.form;
  const watch = form.watch()

  
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-sm font-bold text-blue-500">Accident information</h1>
      
      <div className="flex flex-col gap-4">
        <FormInput
          label="police station"
          placeholder=""
          fullWidth={true}
          name="accidentSchema.policeStation"
          defaultValue={watch.accidentSchema?.policeStation}
        />
        <FormInput
          label="AR no"
          placeholder=""
          fullWidth={true}
          name="accidentSchema.AR_number"
          defaultValue={watch.accidentSchema?.AR_number}
        />
        <FormInput
          label="CAS"
          placeholder=""
          fullWidth={true}
          name="accidentSchema.caseNumber"
          defaultValue={watch.accidentSchema?.caseNumber}
        />
        <FormInput
          label="Serial number"
          placeholder=""
          fullWidth={true}
          name="accidentSchema.serialNumber"
          defaultValue={watch.accidentSchema?.serialNumber}
        />
        <FormInput
          label="Capturing number"
          placeholder=""
          fullWidth={true}
          name="accidentSchema.capturingNumber"
          defaultValue={watch.accidentSchema?.capturingNumber}
        />
        <FormInput
          label="Accident date (MM/DD/YYYY)"
          placeholder="01/01/2017"
          fullWidth={true}
          name="accidentSchema.date"
          type="date"
          defaultValue={watch.accidentSchema?.date}
        />

        <div className="flex items-center gap-6 justify-between">
          <FormSelect
            data={weekDays}
            label="Day of the week"
            name="accidentSchema.day"
            fullWidth={false}
            placeholder="Day of the week"
            defaultValue={watch.accidentSchema?.day}
          />
          <FormInput
            label="Time of accident"
            name="accidentSchema.time"
            fullWidth={false}
            placeholder="21:45"
            defaultValue={watch.accidentSchema?.time}
          />
          <FormInput
            label="Number or cars involved"
            name="accidentSchema.numberOfVehicles"
            fullWidth={false}
            placeholder="2"
            type="number"
            defaultValue={watch.accidentSchema?.numberOfVehicles}
          />
        </div>
       
      </div>
    </section>
  );
};

type AccidentInfoProps = {
  form: any
}
