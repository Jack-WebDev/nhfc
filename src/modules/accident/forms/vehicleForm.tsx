"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "@/lib/apiUrl";
import {
  Form,
  Loader,
  ResponseMessage,
  Button,
  FormInput,
  FormRadio,
  FormSelect,
  FormTextArea,
} from "@/components";
import {
  BooleanWithUnknown,
  boolean,
  direction,
  roadAngle,
  vehicleDamage,
  vehicleLights,
  vehicleManoeuvre,
  vehiclePosition,
  vehicleRef,
  vehicleType,
} from "..";

import { VehicleSchemaType, vehicleSchema } from "@/schema";
import { useParams } from "next/navigation";
import { VehicleDamage } from "./vehicleDamage";

export function VehicleForm() {

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [damage, setDamage] = useState<string[]>([])
  const params = useParams();



  const form = useForm<VehicleSchemaType>({
    resolver: zodResolver(vehicleSchema),
  });

  

  async function onSubmit(values: VehicleSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log("Values: ", values);

    try {
      const data = {
        ...values,
        damage: damage,
        accidentId: params.id
      }
      const res = await axios.post(`${url}/accidents/vehicles`, { ...data });
      setSuccessMessage(res.data.message);

      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 500)
      );
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6 w-full  text-gray-600 relative"
      >
        <section className="flex flex-col gap-4 w-full">

          <FormInput 
            name="vehicleRef"
            placeholder="A"
            label="Vehicler number"
          />
          
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4 ">
              <FormSelect
                name={`travelDirection`}
                label="Travel towards direction"
                data={direction}
                placeholder="Select direction"
              />

              <FormInput
                name={`plateNumber`}
                label="number plate number"
                placeholder="PZ65BV GP"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <FormInput name={`color`} label="Color" placeholder="white" />
              <FormInput name={`make`} label="Make" placeholder="Bmw" />
              <FormInput name={`model`} label="Model" placeholder="332i" />
            </div>

            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-blue-50 fit">
              <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
                Trailer <p className="text-gray-400 text-xs">(if applicable)</p>
              </h1>

              <div className="flex gap-4 w-full">
                <FormInput
                  name={`trailer1Plate`}
                  label="Trailer 1 plate number"
                  placeholder="PZ65BV GP"
                />
                <FormInput
                  name={`trailer2Plate`}
                  label="Trailer 2 plate number"
                  placeholder="PZ65BV GP"
                />
              </div>
            </div>

            <FormSelect
              data={BooleanWithUnknown}
              name={`carryPassengersForReward`}
              label="Carried passengers for reward"
              placeholder="Select answer"
            />

            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-blue-50 fit">
              <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
                Breakdown{" "}
                <p className="text-gray-400 text-xs">(if applicable)</p>
              </h1>

              <div className="flex flex-wrap gap-4 w-full">
                <FormInput
                  name={`breakdownCompanyName`}
                  label="Breakdown company"
                  placeholder="MTC motors"
                />
                <FormInput
                  name={`breakdownTelephoneNumber`}
                  label="Telephone number"
                  placeholder="0123352525"
                />
                <FormInput
                  name={`breakdowndriverName`}
                  label="Driver name"
                  placeholder="James Carter"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-red-50 w-full">
              <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
                Accident related information
              </h1>

              <div className="flex gap-4 flex-wrap max-w-[800px] justify-between">
                <FormSelect
                  name={`type`}
                  data={vehicleType}
                  label="Vehicle Type"
                  placeholder="Select vehicle type"
                  fullWidth={false}
                />
                <FormSelect
                  name={`position`}
                  data={vehiclePosition}
                  label="Vehicle position"
                  placeholder="Select vehicle position"
                  fullWidth={false}
                />
                <FormSelect
                  name={`manoeuvre`}
                  data={vehicleManoeuvre}
                  label="Vehicle manoeuvre/what driver was doing"
                  placeholder="Select vehicle monoeuvre"
                  fullWidth={false}
                />
                <FormSelect
                  name={`slope`}
                  data={roadAngle}
                  label="Flat or slopped"
                  placeholder="Select vehicle monoeuvre"
                  fullWidth={false}
                />
                <FormSelect
                  name={`tiresBurst`}
                  data={vehicleDamage}
                  label="Flat or slopped"
                  placeholder="Select vehicle monoeuvre"
                  fullWidth={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-blue-50 w-full">
              <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
                Dangeroud goods information
              </h1>

              <div className="flex gap-4 flex-wrap max-w-[800px] justify-between">
                <FormSelect
                  name={`dangerousGoodsCarried`}
                  data={boolean}
                  label="Dangerous good carried"
                  placeholder="Select one"
                />
                <FormSelect
                  name={`splillageOccured`}
                  data={boolean}
                  label="Splillage occured"
                  placeholder="Select one"
                  fullWidth={false}
                />
                <FormSelect
                  name={`gasEmmissionOccured`}
                  data={boolean}
                  label="Vapour/gas emission occured"
                  placeholder="Select one"
                  fullWidth={false}
                />
                <FormInput
                  name={`codeSin`}
                  label="Code/Sin"
                  placeholder=""
                  fullWidth={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-red-50 fit">
              <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
                Special observation{" "}
              </h1>

              <FormRadio
                name={`tiresBurst`}
                label="Tyre appears to have burst"
                data={BooleanWithUnknown}
                layout="row"
                flex="row"
              />
              <FormInput
                name={`lengthOfSkidMarks`}
                label="Length of skidmarks: Tape measure"
                placeholder="50"
                type="number"
              />
              <FormRadio
                name={`lights`}
                label="Lights"
                data={vehicleLights}
                layout="row"
                flex="row"
              />
              <FormRadio
                name={`reflectorQuality`}
                label="Reflector quality (reflective tape)"
                data={vehicleLights}
                layout="row"
                flex="row"
              />
              <FormRadio
                name={`chevronQuality`}
                label="Chevron quality"
                data={vehicleLights}
                layout="row"
                flex="row"
              />
              <VehicleDamage setDamage={setDamage}/>
              <FormTextArea
                name={`otherComment`}
                label="Other comment"
                placeholder="Any comment"
              />
            </div>
          </div>
        </section>

        {form.formState.isSubmitting ? (
          <Loader />
        ) : (
          <Button variant="main" type="submit">
            Submit
          </Button>
        )}
        <ResponseMessage
          errorMessage={errorMessage}
          successMessage={successMessage}
        />

     
      </form>
    </Form>
  );
}


