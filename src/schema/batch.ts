import { z } from "zod";

export const batchSchema = z.object({
  batchType: z.number().optional(),
  firstNotice: z.coerce.number(),
  lastNotice: z.coerce.number(),
});
export const batchFormSchema = z.object({
  batchType: z.number().optional(),
  firstNotice: z.coerce.number(),
  numberOfBooks: z.coerce.number(),
  pagesPerBook: z.coerce.number(),
});

export type BatchType = {
  batchId: number;
  batchType: number;
  firstNotice: number;
  lastNotice: number;
  capturedBy: string;
};

export type BatchFormSchemaType = z.infer<typeof batchFormSchema>;
