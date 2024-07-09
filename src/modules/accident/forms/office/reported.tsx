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
  OfficeReportedSchemaType,
  officeOccurenceSchema,
  officeReportedSchema,
} from "@/schema";

export function OfficereportedForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();

  const form = useForm<OfficeReportedSchemaType>({
    resolver: zodResolver(officeReportedSchema),
  });

  async function onSubmit(values: OfficeReportedSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = {
        accidentId: params.id,
        ...values,
        officeType: "Reported"
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
            Office where the accident was reported/form is completed
          </h1>

          <FormInput
            name="department"
            label="Name of department"
            fullWidth={true}
            
         />

          <FormInput
            name="occurenceBookNumber"
            label="Occurence Book no"
            fullWidth={true}
            
         />

          <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-blue-50 ">
            <div className="flex flex-col gap-4 w-full">
              <FormInput
                name="completedBy"
                label="Completed by (Driver, Official, etc)"
                fullWidth={true}
                
             />

              <div className="flex items-center gap-6 justify-between">
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
              </div>
              <FormInput
                label="Surname"
                placeholder="Gumede"
                name="surname"
                fullWidth={true}
               
             />
              <FormInput
                label="Service Number"
                placeholder=""
                name="serviceNumber"
                fullWidth={true}
                
             />

              <div className="flex items-center gap-6 justify-between">
                <FormInput
                  label="Date (MM/DD/YYYY)"
                  placeholder="25/03/2015"
                  name="date"
                  type="date"
                  fullWidth={true}
                  
               />
                <FormInput
                  label="Time (HH:MM)"
                  placeholder="09:45"
                  name="time"
                  
               />
              </div>
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
