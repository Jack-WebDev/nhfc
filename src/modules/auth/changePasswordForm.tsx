"use client";
import { fetchUsersByRole } from "@/apiCalls";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
} from "@/components";
import url from "@/lib/apiUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
}).refine((values) => values.newPassword === values.confirmPassword, {message: "password do not match", path: ["confirmPassword"]})
.refine((values) => values.newPassword !== values.oldPassword, {message: "Use different password", path: ["newPassword"]})

type SchemaType = z.infer<typeof schema>

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();


  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: SchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    // console.log(values);

    const updateInfo = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      userId: props.userId,
    };

    try {
      const res = await axios.post(`${url}/auth/changePassword`, {
        ...updateInfo,
      });
      setSuccessMessage(res.data.message);
      await new Promise((resolve) =>
        setTimeout(() => {
          router.push('/login')
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
        className=" flex flex-col gap-2 w-full  text-gray-600"
      >
        
        <FormInput
          label="Old password"
          placeholder=""
          name="oldPassword"
          fullWidth={true}
          type="password"
        />
        <FormInput
          label="New password"
          placeholder=""
          name="newPassword"
          fullWidth={true}
          type="password"
        />
        <FormInput
          label="Confirm password"
          placeholder=""
          name="confirmPassword"
          fullWidth={true}
          type="password"
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

type ChangePasswordFormProps = {
  userId: string
};
