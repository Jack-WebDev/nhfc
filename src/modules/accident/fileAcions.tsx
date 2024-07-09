import { Button } from "@/components";
import { Download } from "lucide-react";
import React from "react";
import { AddAccidentFile } from "./addFile";
import { DownloadFile } from "./downloadFile";
import { accidentFile } from "@/apiCalls";


export const FileAcions = async (props: Props) => {
  const {accidentId} = props
  const file = await accidentFile(accidentId);

  return (
    <div className="flex items-center gap-4">
        {file && <DownloadFile file={file} />}

        <AddAccidentFile />
    </div>
  )
};

type Props = {
    accidentId: string
};
