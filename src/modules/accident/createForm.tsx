"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "@/lib/apiUrl";
import {
  Button,
  Form,
  Loader,
  ResponseMessage,
} from "@/components";

import { AccidentInfo } from "./forms/accidentInfo";
import { LocationInfo } from "./forms/locationInfo";
import { GeneralInfo } from "./forms/generalInfo";
import { AdditionalInfo } from "./forms/additionalInfo";
import { FormPagination } from "./forms/formPagination";
import { fullAccidentSchema, fullAccidentSchemaType } from "@/schema/accidentSchemas";
import { useRouter } from "next/navigation";

export function CreateForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formPage, setFormPage] = useState<number>(1);
  const router = useRouter();

  const form = useForm<fullAccidentSchemaType>({
    resolver: zodResolver(fullAccidentSchema),
    defaultValues: {},
  });

  // const dataError = form.formState.errors
  // if(dataError.accidentSchema){
  //   setErrorMessage("Form not complete")
  // }

 

  async function onSubmit(values: fullAccidentSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log("Values: ", values)

    try {
      const res = await axios.post(`${url}/accidents`, { ...values });
      setSuccessMessage(res.data.message);

      await new Promise((resolve) =>
        setTimeout(() => {
          router.push(`/dashboard/accidents/${res.data.accidentId}`);
        }, 2000)
      );
    } catch (error: any) {
      console.log(error)
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
       <FormPagination formPage={formPage} setFormPage={setFormPage} />

        {formPage === 1 && <AccidentInfo form={form} />}
        {formPage === 2 && <LocationInfo form={form} />}
        {formPage === 3 && <GeneralInfo form={form}/>}
        {formPage === 4 && <AdditionalInfo form={form}/>}
        


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

         
          <div className="flex items-center gap-6 w-full">

            {
              (form.formState.errors.accidentSchema || form.formState.errors.accidentSchema || form.formState.errors.accidentSchema) && <p className='font-medium text-sm text-red-500 text-center'>Form is not complete</p>
            }
            
          </div>
        
        
      </form>
    </Form>
  );
}
