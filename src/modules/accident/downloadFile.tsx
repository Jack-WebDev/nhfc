import { accidentFile } from "@/apiCalls";
import { Button } from "@/components";
import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

export const DownloadFile = async (props: Props) => {
  const { file } = props;


  return (
    file && (

        <Link
          href={file.file}
          target="_blank"
          rel="noreferrer"
          download={file.accidentId}
        >
          <Button
            variant="ghost"
            className="shadow-lg text-xs flex items-center gap-2 bg-green-600 text-white h-fit hover:bg-green-500 hover:text-white"
          >
            <Download size={15} />
            File
          </Button>
        </Link>

    )
  );
};

type Props = {
  file: FileType;
};

export type FileType = {
    id: string,
    accidentId: string,
    fileType: string,
    file:string
}
