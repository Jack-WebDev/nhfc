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
import { useParams } from "next/navigation";
import { PassengerSchemaType, passengerSchema } from "@/schema";
import { Passenger } from "../tabs/passenger";

export function PassengerNotEnjured() {
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



    try {
      const data = {
        accidentId: params.id,
        ...values,
        injury: "No injury"

      }
      const res = await axios.post(`${url}/accidents/passengers`, { ...data,  });
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
        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-gray-50 fit">
          <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
            Passenger not enjured
          </h1>

          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput
              name={`passengerNumber`}
              label="Passenger number"
              placeholder={"1"}
            />
            <FormSelect 
              name="vehicleNumber"
              data={vehicleRef}
              placeholder="Select Vehicle"
              label="Vehicle number"
            />
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
              type="number"
              placeholder="975624842548"
            />
          </div>
          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput name={`surname`} label="Surname" placeholder="Radebe" />
            <FormInput name={`initials`} label="Initials" placeholder="JT" />
          </div>
          <div className="flex items-center gap-8 w-full ">
            <FormInput
              name={`telephoneNumber`}
              label="Telephone/Cellphone number"
              placeholder="0863321414"
            />
            <FormRadio
              data={phoneType}
              name={`telephoneNumberType`}
              label="Phone type"
              layout="row"
            />
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
