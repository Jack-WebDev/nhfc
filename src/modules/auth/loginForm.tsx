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
} from "@/components";
import {z} from "zod"

import { Plus } from "lucide-react";
import axios from "axios";
import url from "@/lib/apiUrl";
import { FormInput } from "@/components";
import Link from "next/link";
import { ForgotPassword } from ".";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type LoginSchemaType = z.infer<typeof loginSchema>


export function LoginForm() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {toast} = useToast()
  

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });


  async function onSubmit(values: LoginSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

      try {
  
        const res = await axios.post(`${url}/auth/login`, {...values});
        setSuccessMessage(res.data.message);
        location.reload()
  
      } catch (error: any) {
        console.log(error)
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Network error");
          toast({
            variant: "error",
            title: "Error!",
            description: error?.response
              ? error?.response?.data?.message
                ? error?.response?.data?.message
                : "Unknown error"
              : "Network error",
          });
        }
      
    }

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6 px-0  w-full text-gray-500"
      >
    
        <FormInput placeholder="example@mail.com" label="Email" name="email" fullWidth={true} />
        <FormInput placeholder="*******" label="Password" name="password" fullWidth={true} type="password"/>

        
        
       
        
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


