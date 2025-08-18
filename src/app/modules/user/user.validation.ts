import { z } from "zod";
import { userRoles } from "./user.constant";

export const createUserZodSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be 'admin', or 'user'",
  }),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be longer than 2 characters" })
    .max(50, { message: "Name cannot be exceed 50 characters" })
    .optional(),
  phone: z
    .string({ invalid_type_error: "Phone number must be string" })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    })
    .optional(),
  role: z.enum(Object.values(userRoles) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot be exceed 200 characters" })
    .optional(),
});
