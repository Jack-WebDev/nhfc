// src/app/(web)/frontend/_components/types.ts

export type Notification = {
    message: string;
    referenceNo: string;
    fullName: string;
    queryType: string;
    queryDate: string;
    queryStatus: string;
    description: string;
    attachments?: string; // Include attachments
  };
  