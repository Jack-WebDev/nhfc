"use client"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormInput,
  Loader,
  ResponseMessage,
} from "@/components";
import { Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import { UserType } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import url from "@/lib/apiUrl";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
});

type SchemaType = z.infer<typeof schema>;

export function ForgotPassword() {
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-blue-500 text-xs cursor-pointer ">Forgot password</p>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full min-w-max  ">
        <ForgotPasswordForm />
      </DialogContent>
    </Dialog>
  );
}



function ForgotPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
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
    
    try {
      const res = await axios.post(`${url}/auth/forgotPassword`, { ...values });
      setSuccessMessage(res.data.message);
      
      await new Promise((resolve) =>
        setTimeout(() => {
          router.push("/verifyOtp")
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

        <FormInput label="Email" placeholder="example@mail.com" name="email" fullWidth={true}
        description="You will recieve an OTP to this email"
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
