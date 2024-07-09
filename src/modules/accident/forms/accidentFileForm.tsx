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
  FileUpload,
  FormSelect,
  SelectData,
} from "@/components";
import { z } from "zod";

import { useParams } from "next/navigation";

const fileSchema = z.object({
  fileType: z.string(),
});

type FileSchemaType = z.infer<typeof fileSchema>;

export function AccidentFileForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [fileUploadResponse, setFileUploadResponse] = useState<any>();
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const params = useParams();

  const form = useForm<FileSchemaType>({
    resolver: zodResolver(fileSchema),
  });

  const list: SelectData[] = [
    {
      id: "1489664b-ed60-5f80-b0b1-2d32dd0228a8",
      title: "Image",
      value: "Image",
    },
    {
      id: "ab67e457-71b5-5a33-abba-ddd1efd0b677",
      title: "PDF",
      value: "PDF",
    },
  ];

  async function onSubmit(values: FileSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = {
        accidentId: params.id,
        ...values,
        file: fileUploadResponse?.url,
      };
      const res = await axios.post(`${url}/fileUpload`, { ...data });
      setSuccessMessage(res.data.message);

      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 500)
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
        className=" flex flex-col gap-6 w-[200px]  text-gray-600 relative"
      >
        <div className="w-[200px] flex flex-col gap-2 items-center justify-center">
          <FormSelect
            label="File type"
            name="fileType"
            data={list}
            placeholder="Select file type"
            fullWidth={true}
          />
          <FileUpload
            document={form.watch().fileType === "PDF" ? true : false}
            setUploading={setFileUploading}
            setResponse={setFileUploadResponse}
            
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
