"use client";
import { fetchUsersByRole } from "@/apiCalls";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
  SelectData,
} from "@/components";
import url from "@/lib/apiUrl";
import { BookType, UserType, issueBookSchema, issueBookSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function IssueBookForm(props: IssueBookFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { officers, bookNumber, action } = props;

  let fields: SelectData[] = [];

  officers &&
    officers.map((user) => {
      const field = {
        id: user.id,
        title: user.firstName + " " + user.lastName,
        value: user.id,
      };

      fields.push(field);
    });

  const form = useForm<issueBookSchemaType>({
    resolver: zodResolver(issueBookSchema),
    defaultValues: {},
  });

  async function onSubmit(values: issueBookSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const updateInfo = {
      officerId: values.trafficOfficer,
      date: values.issueDate,
      status: action === "Issue"? "Issued" : "Re_Issued",
    };

    try {
      const res = await axios.patch(`${url}/books/${bookNumber}`, {
        ...updateInfo,
      });
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
        className=" flex flex-col gap-6 w-full  text-gray-600"
      >
        <FormSelect
          data={fields}
          fullWidth={true}
          label="Officer"
          placeholder="Select officer"
          name="trafficOfficer"
        />
        <FormInput
          label="Date"
          placeholder="date"
          name="issueDate"
          fullWidth={true}
          type="date"
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

export async function IssueBookActions (props: IssueBookActionsProps)  {

  const {book, officers, action} = props;

return (
  <Dialog>
      <DialogTrigger asChild>
          
             
              <Button variant="orange" >
                  {action.split("_").join(" ")} book
              </Button>
              
          

      </DialogTrigger>

      <DialogContent>
          <DialogHeader className='text-mb font-semibold '>{action.split("_").join(" ")} Book</DialogHeader>
          <IssueBookForm officers={officers} bookNumber={book.bookNumber} action={action}/>
      </DialogContent>
  </Dialog>
)
}

type IssueBookFormProps = {
  officers: UserType[];
  bookNumber: number;
  action: string
};
type IssueBookActionsProps = {
  officers: UserType[];
  book: BookType
  action: string
};
