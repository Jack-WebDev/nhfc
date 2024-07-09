"use client"
import {
  Form,
  Button,
  FormField,
  ResponseMessage,
  Loader,
  FormInput,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import url from "@/lib/apiUrl";
import { BookType } from "@/schema";

const schema = z.object({
  date: z.coerce.date(),
});

type schemaType = z.infer<typeof schema>;

export function HandInBookForm(props: HandInBookFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { bookNumber } = props;

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: schemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const updateInfo = {
      date: values.date,
      status: "Handed_In",
    };
    try {
        const res = await axios.patch(`${url}/books/${bookNumber}`, { ...updateInfo });
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
        <FormInput
          label="Date"
          placeholder="date"
          name="date"
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

export async function HandInBookActions (props: HandInBookActionsProps)  {

  const {book,} = props;


return (
  <Dialog>
      <DialogTrigger asChild>
          
             
              <Button variant="main" >
                  Hand in book
              </Button>
              
          

      </DialogTrigger>

      <DialogContent>
          <DialogHeader className='text-mb font-semibold '>hand in Book</DialogHeader>
          <HandInBookForm bookNumber={book.bookNumber} />
      </DialogContent>
  </Dialog>
)
}

type HandInBookFormProps = {
  bookNumber: number;
};
type HandInBookActionsProps = {
  book: BookType;
};
