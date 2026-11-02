"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookFormSchema, BookFormValues } from "@/schemas/book.schema";
import type { Category } from "@/types";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const SAMPLE_COVERS = [
  "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780141439518-L.jpg&w=480&fit=cover",
  "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780140449136-L.jpg&w=480&fit=cover",
  "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780060935467-L.jpg&w=480&fit=cover",
];

interface BookFormProps {
  defaultValues?: Partial<BookFormValues>;
  submitLabel: string;
  submitting?: boolean;
  footer?: React.ReactNode;
  onSubmit: (values: BookFormValues) => void | Promise<void>;
  onWatchValues?: (values: BookFormValues) => void;
}

export function BookForm({
  defaultValues,
  submitLabel,
  submitting = false,
  footer,
  onSubmit,
  onWatchValues,
}: BookFormProps) {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "Fiction",
      image: "",
      description: "",
      totalCopies: 1,
      ...defaultValues,
    },
    mode: "onTouched",
  });

  const watched = useWatch({
    control: form.control,
  });

  const descriptionLength = (watched.description ?? "").length;

  useEffect(() => {
    onWatchValues?.(watched as BookFormValues);
  }, [watched, onWatchValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. The Name of the Wind" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid items-start gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Patrick Rothfuss" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a shelf" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      [
                        "Fiction",
                        "Science",
                        "History",
                        "Kids",
                        "Others",
                      ] satisfies Category[]
                    ).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-3">
                <FormLabel>Book Image URL</FormLabel>
                <button
                  type="button"
                  onClick={() => {
                    const next =
                      SAMPLE_COVERS[
                        Math.floor(Math.random() * SAMPLE_COVERS.length)
                      ];

                    field.onChange(next);
                  }}
                  className="text-muted-foreground hover:border-primary/50 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 text-[11px] font-medium transition-colors"
                >
                  <ImageIcon aria-hidden className="size-3" />
                  Use a sample cover
                </button>
              </div>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://…/cover.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Paste a link to the book cover (we'll preview it on the right).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="A sentence or two about the book…"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormDescription>
                  Tell readers why they should read it.
                </FormDescription>
                <span
                  aria-live="polite"
                  className={`text-xs tabular-nums ${
                    descriptionLength > 320
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {descriptionLength}/320
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={99}
                  step={1}
                  placeholder="e.g. 2"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  value={field.value}
                  onChange={(event) => {
                    const value = event.currentTarget.value;

                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              </FormControl>
              <FormDescription>
                How many copies can be on loan at once.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {footer}

        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer rounded-full sm:w-auto sm:px-8"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="size-4.5 animate-spin" />
              Placing it on the shelf…
            </>
          ) : (
            <>
              <PlusCircle aria-hidden className="size-4.5" />
              {submitLabel}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
