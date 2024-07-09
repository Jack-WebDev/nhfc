import { z } from "zod";

export const noticeSchema = z.object({
  bookNumber: z.number(),
  noticeNumber: z.number(),
  check: z.number(),
  status: z.string().optional(),
});

export type NoticeType = {
  id: string;
  bookNumber: number;
  noticeNumber: number;
  check: number;
  status: string;
};

export type NoticeSchemaType = z.infer<typeof noticeSchema>;
