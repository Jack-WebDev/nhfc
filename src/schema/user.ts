import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  IdNumber: z
    .string()
    .refine((id) => id.length === 13, { message: "invalid ID Number" }),
  phone: z
    .string()
    .refine((phone) => phone.length === 10 && phone.startsWith("0"), {
      message: "invalid phone number",
    }),
  password: z.string().optional(),
  ethnicity: z.string(),
  role: z.string(),
  status: z.string().optional(),
  gender: z.string().optional(),
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  title: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  IdNumber: z
    .string()
    .refine((id) => id.length === 13, { message: "invalid ID Number" })
    .optional(),
  hone: z
    .string()
    .refine((phone) => phone.length === 10 && phone.startsWith("0"), {
      message: "invalid phone number",
    })
    .optional(),
  password: z.string().optional(),
  ethnicity: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional().optional(),
  gender: z.string().optional().optional(),
});

export type UserType = {
  id: string;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  IdNumber: string;
  phone: string;
  password: string;
  ethnicity: string;
  role: string;
  status: string;
  gender: string | null;
};

export type UserSchemaType = z.infer<typeof userSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;
