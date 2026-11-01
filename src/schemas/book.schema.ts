import { z } from "zod";

export const bookFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Give the book a title of at least 2 characters.")
    .max(120, "Keep the title under 120 characters."),

  author: z
    .string()
    .trim()
    .min(2, "Who wrote it? At least 2 characters.")
    .max(80, "Keep the author name under 80 characters."),

  category: z.enum(["Fiction", "Science", "History", "Kids", "Others"]),

  image: z
    .string()
    .trim()
    .min(1, "A cover image URL keeps the shelves beautiful.")
    .pipe(
      z.url({
        protocol: /^https?$/,
        error: "Enter a valid URL starting with http:// or https://",
      }),
    ),

  description: z
    .string()
    .trim()
    .min(30, "Tell future readers a little more — at least 30 characters.")
    .max(320, "Keep the description under 320 characters."),

  totalCopies: z
    .number({ message: "Enter the number of copies." })
    .int("Whole copies only, please.")
    .min(1, "The library needs at least one copy.")
    .max(99, "Let's keep it under 100 copies for this demo."),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
