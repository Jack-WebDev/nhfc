"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "@/lib/apiUrl";
import { UserContextType, useUserContext } from "@/context";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
} from "@/components";
import { BatchFormSchemaType, batchFormSchema } from "@/schema";

export function CreateForm(props: CreateFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [typeString, setTypeString] = useState<string>("");
  const { type } = props;
  const {data} = useUserContext() as UserContextType;
  

  const form = useForm<BatchFormSchemaType>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {},
  });

  

  useEffect(() => {
    switch (type) {
        case 10: 
           setTypeString("341 Hand written");
          break;
        case 50: 
           setTypeString("Section 56");
          break;
        case 51: 
           setTypeString("Section 56 By-Law");
          break;
      }
  },[type])

  

  async function onSubmit(values: BatchFormSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log(values);

    try {

      const lastNotice = (values.firstNotice * values.pagesPerBook) - 1
      const newBatch = {
        ...values,
        batchType: type,
        capturedBy: data?.userId,
        lastNotice: lastNotice
      }
      const res = await axios.post(`${url}/batch`, { ...newBatch });
      setSuccessMessage(res.data.message);
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 2000)
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
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <p className="w-full text-center font-semibold text-mg text-red-500">{typeString}</p>

        <FormInput fullWidth={true} label="First notice number" name="firstNotice" placeholder="" />
        <FormInput fullWidth={true} label="Number of books" name="numberOfBooks" placeholder="" />
        <FormInput fullWidth={true} label="Pages per book" name="pagesPerBook" placeholder="" />

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

type CreateFormProps = {
  type: number;
};
