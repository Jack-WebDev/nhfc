
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Button,
  Loader,
  ResponseMessage,
  useToast,
  FormSelect,
} from "@/components";
import {z} from "zod"
import { useRouter } from "next/navigation";

import axios from "axios";
import url from "@/lib/apiUrl";
import { FormInput } from "@/components";
import { reportType } from "./selectData";


const reportSchema = z.object({
    reportType: z.string(),
    fromDate: z.string(),
    toDate: z.string(),
})

type ReportSchemaType = z.infer<typeof reportSchema>


export function ReportForm() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  

  const form = useForm<ReportSchemaType>({
    resolver: zodResolver(reportSchema),
    defaultValues: {},
  });


  async function onSubmit(values: ReportSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

      
  
        
        await new Promise((resolve) =>
        setTimeout(() => {
          router.push(`/dashboard/accidentReports/${values.reportType}?period=${values.fromDate}to${values.toDate}`);
        }, 500)
      );
  
     

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6  text-gray-500 w-1/3 bg-white shadow-lg border border-gray-100 rounded-lg p-4"
      >
        
        <h1 className="text-md font-semibold text-gray-700">Generate report</h1>
        <FormSelect 
            name="reportType"     
            data={reportType}
            label="Report type"
            placeholder="Select report type"   
            fullWidth={true}
        />

        <FormInput 
            type="date"
            name="fromDate"
            label="From date"
            fullWidth={true}
        />
        <FormInput 
            type="date"
            name="toDate"
            label="To date"
            fullWidth={true}
        />
        
        {form.formState.isSubmitting ? (
          <Loader />
        ) : (
          <Button variant="main"  type="submit">Submit</Button>
        )}
        <ResponseMessage
          errorMessage={errorMessage}
          successMessage={successMessage}
        />


      </form>
    </Form>
  );
}


