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
} from "@/components";

import { count } from "console";
import { watch } from "fs";
import { WitnessSchemaType, witnessSchema } from "@/schema";
import { witnessType } from "../selectData";
import { useParams } from "next/navigation";

export function WitnessForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();

  const form = useForm<WitnessSchemaType>({
    resolver: zodResolver(witnessSchema),
  });

  async function onSubmit(values: WitnessSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log("Values: ", values);

    try {
      const data = {
        ...values,
        accidentId: params.id
      }
      const res = await axios.post(`${url}/accidents/witnesses`, { ...data });
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
         

          <div className="flex items-center gap-4 w-[600px]  justify-between">
            <FormRadio
              data={witnessType}
              name={`type`}
              label="Witness type"
              layout="row"
              fullWidth={true}
            />
          </div>

          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput
              name={`surname`}
              label="Surname"
              placeholder="Doe"
              fullWidth={true}
            />
            <FormInput name={`initials`} label="Initials" placeholder="DL" />
          </div>

          <FormTextArea
            name={`address`}
            label="Work/Contact address"
            placeholder="3rd Floor, Friday Morning Studios, 94 Florida Rd, Windermere, Durban, 4001"
          />
          <div className="flex items-center gap-4 w-full  justify-between">
            <FormInput
              name={`contactNumber`}
              label="Cellphone number/Telephone number"
              placeholder="0789986565"
              fullWidth={true}
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
