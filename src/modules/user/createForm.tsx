"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchemaType, userSchema } from "@/schema";
import axios from "axios";
import url from "@/lib/apiUrl";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
} from "@/components";
import { ethnicityList, genderList, roleList, userTitleList } from ".";
import * as DialogPrimitive from "@radix-ui/react-dialog"

export function CreateForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });

  async function onSubmit(values: UserSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await axios.post(`${url}/users`, { ...values });
      setSuccessMessage(res.data.message);
      
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload()
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
        className=" flex flex-col gap-6 w-full md:w-[600px] text-gray-600"
      >
        <div className="flex flex-col gap-2 w-full ">
          <h1 className="text-semibold text-black ">User details:</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
            <FormInput
              description="First name"
              name="firstName"
              placeholder="Jane"
            />
            <FormInput
              description="Last name"
              name="lastName"
              placeholder="Doe"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
          <FormSelect
              description="Title"
              name="title"
              data={userTitleList}
              placeholder="Select title"
            />
            <FormInput
            description="ID number"
            name="IdNumber"
            type="number"
          />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <FormSelect
              description="Gender"
              name="gender"
              data={genderList}
              placeholder="Select gender"
            />
            
            <FormSelect
              description="Ethnicity"
              name="ethnicity"
              data={ethnicityList}
              placeholder="Select ethnicity"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-semibold text-black">Contact details:</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <FormInput
              description="Email"
              name="email"
              placeholder="example@mail.com"
            />
            <FormInput
              description="Phone number"
              name="phone"
              placeholder="0842235656"
              type="number"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <h1 className="text-semibold text-black ">Role:</h1>
          <FormSelect
            description="Role"
            name="role"
            data={roleList}
            placeholder="Select role"
            fullWidth={true}
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
