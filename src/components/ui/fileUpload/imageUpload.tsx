"use client";
import { useEdgeStore } from "@/context";
import React, { useEffect, useState } from "react";
import { SingleImageDropzone } from ".";
import { Button } from "..";
import { Progress } from "../progress";

export function FileUpload(props: FileUploadProps) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [startUpload, setStartUpload] = useState<boolean>(false);

  const { setResponse, setUploading, document } = props;
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    setStartUpload(startUpload === true && false);

    const uploadImage = async () => {
      if (file) {
        setUploading && setUploading(true);
        setStartUpload(true);
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });

        setResponse(res);
        setUploading && setUploading(false);
      }
    };

    uploadImage();
  }, [file]);

  return (
    <div className="flex flex-col gap-3 w-fit">
      
        <SingleImageDropzone
          width={200}
          height={file ? 200 : 50}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
          document={document? document : false}
          
        />
     

      {startUpload && (
        <div className="flex flex-col items-start gap-1 w-full ">
          <Progress value={progress} className="w-full " />
          <span className="text-xs ">
            {progress === 100 ? "Done" : `${progress}%`}
          </span>
        </div>
      )}
    </div>
  );
}

type FileUploadProps = {
  setResponse: React.SetStateAction<any>;
  setUploading?: (value: boolean) => void;
  document?: boolean;
};
