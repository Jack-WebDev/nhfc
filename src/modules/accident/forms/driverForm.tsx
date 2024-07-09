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
  driverRef,
  gender,
  injuryList,
  licenseType,
  phoneType,
  race,
} from "..";
import { useParams } from "next/navigation";

import { DriverSchemaType, driverSchema } from "@/schema";

export function DriverForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();

  const form = useForm<DriverSchemaType>({
    resolver: zodResolver(driverSchema),
  });

  async function onSubmit(values: DriverSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = {
        accidentId: params.id,
        ...values,
      };
      const res = await axios.post(`${url}/accidents/drivers`, { ...data });
      setSuccessMessage(res.data.message);

      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 500)
      );
    } catch (error: any) {
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
          <div className="flex flex-col gap-4">
            <FormInput
              name="driverRef"
              placeholder="B"
              label="Driver reference"
            />
            <div className="flex items-center justify-between gap-6 min-w-[600px]">
              <FormInput
                name={`idType`}
                label="Id type"
                placeholder="02"
                type="number"
              />

              <FormInput
                label="ID Number"
                name={`idNumber`}
                placeholder="9403254875624"
                type="number"
                fullWidth={true}
              />
              <FormInput
                label="Age"
                name={`age`}
                placeholder="22"
                type="number"
              />
            </div>
            <div className="flex items-center gap-6 justify-between">
              <FormInput
                label="Country"
                name={`country`}
                placeholder="South Africa"
              />
              <FormInput label="Surname" name={`surname`} placeholder="Doe" />
            </div>

            <div className="flex items-center justify-between">
              <FormInput
                label="Full names"
                name={`fullNames`}
                placeholder="John Steve"
              />
              <FormInput label="Initials" name={`initials`} placeholder="JD" />
            </div>
            <FormTextArea
              label="Residential/home address"
              name={`homeAddress`}
              placeholder="18 west street Johannesburn 1860"
            />
            <FormTextArea
              label="Work/contact address"
              name={`workAddress`}
              placeholder="18 west street Johannesburn 1860"
            />

            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4  bg-red-50">
              <h1 className="text-semibold text-md text-gray-500">Contact</h1>

              <div className="flex items-center gap-4 flex-wrap">
                <FormRadio
                  data={phoneType}
                  name={`telephoneNumberType`}
                  label="Telephone number type"
                  layout="row"
                />

                <FormInput
                  name={`telephoneNumber`}
                  label="Telephone number"
                  placeholder="1052254548"
                  type="number"
                />
                <FormInput
                  name={`cellphoneNumber`}
                  label="Cellphone number"
                  type="number"
                  placeholder="0742253636"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <FormSelect
                data={gender}
                label="Gender"
                name={`gender`}
                placeholder="Select gender"
              />
              <FormSelect
                data={race}
                label="How would you describe the driver?"
                name={`race`}
                placeholder="Select race"
              />
            </div>

            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg bg-blue-50 p-4 ">
              <h1 className="text-semibold text-md text-gray-500">
                Licence details
              </h1>

              <div className="flex items-center justify-between w-full">
                <FormSelect
                  label="License Type"
                  placeholder="Select license type"
                  data={licenseType}
                  name={`licenceType`}
                />

                <FormInput
                  label="Date of issue(MM/DD/YYYY)"
                  name={`licenceDateOfIssue`}
                  placeholder="05/18/2015"
                  type="date"
                />
              </div>
              <FormInput
                label="Licence number"
                name={`licenceNumber`}
                placeholder="202600028TDX7"
              />
            </div>
            <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 fit">
              <h1 className="text-semibold text-md text-gray-500">Safety</h1>

              <div className="flex items-center">
                <div className="flex flex-col items-start flex-1  gap-4  max-w-full">
                  <FormRadio
                    data={injuryList}
                    name={`injury`}
                    label="Severity of injury"
                    layout="row"
                  />
                  <FormRadio
                    data={BooleanWithUnknown}
                    name={`safetyPresent`}
                    label="Seatbelt fittet/helmet present"
                    layout="row"
                  />

                  <FormRadio
                    data={BooleanWithUnknown}
                    name={`safetyUsed`}
                    label="Seatbelt/helmet definitely used"
                    layout="row"
                  />
                </div>
                <div className="flex flex-col items-start flex-1  gap-4  max-w-full">
                  <FormRadio
                    data={boolean}
                    name={`influenceSuspected`}
                    label="Liquor/drug use suspected"
                    layout="row"
                  />

                  <FormRadio
                    data={boolean}
                    name={`influenceTested`}
                    label="Liquor/drug use evidentiary tested"
                    layout="row"
                  />
                  <FormRadio
                    data={boolean}
                    name={`anyPassengerOrPedestrian`}
                    label="Any passengers/pedestrians?"
                    layout="row"
                  />
                </div>
              </div>
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
