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

import { useParams } from "next/navigation";

import {
  OfficeOccuredSchemaType,
  officeOccurenceSchema,
} from "@/schema";

export function OfficeOccurenceForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();

  const form = useForm<OfficeOccuredSchemaType>({
    resolver: zodResolver(officeOccurenceSchema),
  });

  async function onSubmit(values: OfficeOccuredSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = {
        accidentId: params.id,
        ...values,
        officeType: "Occurence"
      };
      const res = await axios.post(`${url}/accidents/offices`, { ...data });
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
        <div className="flex flex-1 flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-gray-50 fit">
          <h1 className=" flex items-center gap-2 font-semibold text-md text-gray-500">
            Office in which area the accident occured
          </h1>

          <FormInput
            name="occurenceBookNumber"
            label="Occurence Book no"
            fullWidth={true}
          />

          <FormInput
            name="accidentRegisterNumber"
            label="Accident Register no"
            fullWidth={true}
          />
          <FormInput
            name="sapsCaseNumber"
            label="SAPS CAS no"
            fullWidth={true}
          />
          <FormInput
            name="department"
            label="Name of department"
            fullWidth={true}
          />

          <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-red-50 ">
            <h1 className=" flex items-center gap-2 text-semibold text-md text-black">
              Inspected by
            </h1>

            <div className="flex flex-col gap-4 w-full">
              <FormInput
                label="Surname"
                placeholder="Mahlangu"
                name="surname"
                fullWidth={true}
              />
              <FormInput
                label="Initials"
                placeholder="GH"
                name="initials"
                fullWidth={true}
              />
              <FormInput
                label="rank"
                placeholder=""
                name="rank"
                fullWidth={true}
              />
              <FormInput
                label="Service Number"
                placeholder=""
                name="serviceNumber"
                fullWidth={true}
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
