import { z } from "zod";
import { NoticeType } from "./notice";

export const bookSchema = z.object({
  batchId: z.number(),
  bookNumber: z.number(),
  firstNotice: z.number(),
  lastNotice: z.number(),
  total: z.number(),
  complete: z.number(),
  officerId: z.string().cuid(),
  status: z.string(),
  date: z.coerce.date().optional(),
});

export const issueBookSchema = z.object({
  trafficOfficer: z.string().cuid(),
  issueDate: z.coerce.date(),
});

export type BookType = {
  id: string;
  bookType: number;
  batchId: number;
  bookNumber: number;
  firstNotice: number;
  lastNotice: number;
  total: number;
  complete: number;
  officerId: string | null;
  status: string;
  date: Date | null;
};

export type BookSchemaType = z.infer<typeof bookSchema>;
export type issueBookSchemaType = z.infer<typeof issueBookSchema>;
