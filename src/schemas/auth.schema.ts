import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Tell us your name — at least 2 characters.")
      .max(60, "Keep it under 60 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email.")
      .email("That doesn't look like a valid email."),
    photoUrl: z
      .string()
      .trim()
      .refine(
        (v) => v === "" || /^https?:\/\/\S+$/.test(v),
        "Photo URLs start with http:// or https://",
      )
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[a-z]/, "Include at least one lowercase letter."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match — try again.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
