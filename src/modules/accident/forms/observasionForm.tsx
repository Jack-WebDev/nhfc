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
  FormTextArea,
  FormSelect,
} from "@/components";
import { boolean, personSpace, vehicleRef, witnessType } from "../selectData";
import { useParams } from "next/navigation";
import { PesronObservationSchemaType, personObservationSchema } from "@/schema";

export function ObservationForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();

  const form = useForm<PesronObservationSchemaType>({
    resolver: zodResolver(personObservationSchema),
  });

  async function onSubmit(values: PesronObservationSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log("Values: ", values);

    try {
      const data = {
        ...values,
        accidentId: params.id
      }
      const res = await axios.post(`${url}/accidents/observations`, { ...data });
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
         

          <div className="flex items-center gap-4   justify-between w-full">
            <FormSelect 
                name="vehicleNumber"
                data={vehicleRef}
                label="Vehicle Number"
                placeholder="Select vehicle number"
            />
            <FormInput 
                name="personNumber"
                label="Person number"
                placeholder="2"
            />
          </div>

          <div className="flex items-center gap-4  justify-between w-full">
            <FormSelect
             data={personSpace}
              name={`trapped`}
              label="Trapped/fallen out"
              placeholder="Select one"
            />
            <FormSelect
             data={boolean}
              name={`instrument`}
              label="Use of cellphone/other handheld instrument suspected"
              placeholder="Select one"
            />
           
          </div>

          <FormTextArea
            name={`otherInfo`}
            label="Other related information"
            placeholder="Any information"
          />
          
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
