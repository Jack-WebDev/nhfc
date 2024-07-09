import {
  FormCheckBox,
  FormInput,
  FormTextArea,
  FormRadio,
  FormSelect,
  Button,
  Form,
  Loader,
  ResponseMessage,
} from "@/components";

import React, { useState } from "react";
import {
  phoneType,
  boolean,
  race,
  gender,
  injuryList,
  BooleanWithUnknown,
  vehicleRef,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "@/lib/apiUrl";
import { PassengerSchemaType, passengerSchema } from "@/schema";
import { useParams } from "next/navigation";

export function InjuredPassenger() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [passengerType, setPassengerType] = useState<string>("");
  const params = useParams();


  const form = useForm<PassengerSchemaType>({
    resolver: zodResolver(passengerSchema),
  });

  async function onSubmit(values: PassengerSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log("Values: ", values);

    try {
      const data = {
        accidentId: params.id,
        ...values
      }
      const res = await axios.post(`${url}/accidents/passengers`, { ...data });
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
        <div
          className={
            "flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-gray-50 fit"
          }
        >
          <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
            Injured Passenger
          </h1>

          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput
              name={`passengerNumber`}
              label="Passenger number"
              placeholder="1"
            />
            <FormSelect
              name="vehicleNumber"
              data={vehicleRef}
              placeholder="Select Vehicle"
              label="Vehicle number"
            />

            <FormInput name={`pedestrian`} label="Pedestrian" placeholder="B" />
          </div>

          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput
              name={`idType`}
              label="Id type"
              placeholder="02"
              type="number"
            />
            <FormInput
              name={`idNumber`}
              label="Id number"
              placeholder="8911256854721"
              type="number"
            />
          </div>
          <FormInput
            name={`country`}
            label="Country of origin on Id"
            placeholder="South Africa"
            fullWidth={true}
          />
          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput name={`surname`} label="Surname" placeholder="Doe" />
            <FormInput name={`initials`} label="Initials" placeholder="GJ" />
            <FormInput
              name={`gender`}
              label="Age"
              type="number"
              placeholder="20"
            />
          </div>
          <FormTextArea
            name={`address`}
            label="Home/Contact address"
            placeholder="3rd Floor, Friday Morning Studios, 94 Florida Rd, Windermere, Durban, 4001"
          />
          <div className="flex items-center gap-8 w-full ">
            <FormInput
              name={`telephoneNumber`}
              label="Telephone"
              placeholder="0215589696"
              type="number"
            />
            <FormRadio
              data={phoneType}
              name={`telephoneNumberType`}
              label="Phone type"
              layout="row"
            />
          </div>
          <div className="flex items-center gap-8 w-full ">
            <FormInput
              name={`cellphoneNumber`}
              label="Cellphone/other number"
              placeholder="0665584747"
              type="number"
            />
            <FormRadio
              data={phoneType}
              name={`cellphoneNumberType`}
              label="Phone type"
              layout="row"
            />
          </div>
          <div className="flex items-center gap-8 w-full ">
            <FormSelect
              name={`race`}
              label="How would you describe the person"
              placeholder="Select race"
              data={race}
              fullWidth={true}
            />
            <FormSelect
              name={`gender`}
              label="Gender"
              placeholder="Select gender"
              data={gender}
            />
          </div>
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
            </div>
          </div>
        </div>
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
