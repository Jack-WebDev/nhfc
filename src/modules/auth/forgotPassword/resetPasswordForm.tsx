"use client"
import {
    Button,
    Form,
    FormInput,
    Loader,
    ResponseMessage,
  } from "@/components";
  import url from "@/lib/apiUrl";
  import { zodResolver } from "@hookform/resolvers/zod";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import React, { useState } from "react";
import { useForm } from "react-hook-form";
  import { z } from "zod";

export function ResertPasswordForm(props: ResertPasswordFormProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const router = useRouter();
    
  
    const formSchema = z
      .object({
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((values) => values.confirmPassword === values.password, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
  
    type FormSchemaType = z.infer<typeof formSchema>;
  
    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
    });
  
    async function onSubmit(values: FormSchemaType) {
      setSuccessMessage("");
      setErrorMessage("");

      const data = {
        password: values.password,
        userId: props.userId
      }
  
      try {
        const res = await axios.post(`${url}/auth/resetPassword`, { ...data });
        setSuccessMessage(res.data.message);
  
        await new Promise((resolve) =>
          setTimeout(() => {
            router.push("/login");
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
          className=" flex flex-col gap-6 w-full p-6 text-gray-600"
        >
  
          <FormInput label="Password" placeholder="" name="password" fullWidth={true}
          description="Enter your new password"
          />
          <FormInput label="Confirm password" placeholder="" name="confirmPassword" fullWidth={true}
          description="Re enter your new password"
          />
  
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

  type ResertPasswordFormProps = {
    userId: string
  }