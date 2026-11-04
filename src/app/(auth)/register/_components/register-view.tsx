"use client";

import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { AuthVisual } from "@/components/shared/auth-visual";
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
import { usePageTitle } from "@/hooks/use-page-title";
import { signIn, signUp } from "@/lib/auth-client";
import { RegisterFormValues, registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  UserPlus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordChecklist } from "./password-checklist";

export default function RegisterView() {
  usePageTitle("Register");

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      photoUrl: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const password = form.watch("password");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { data, error } = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.photoUrl || undefined,
      });

      if (error) {
        switch (error.code) {
          case "VALIDATION_ERROR":
            toast.error("Please enter a valid email address.");
            break;

          case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
            toast.error(
              "An account with this email already exists. Please use another email.",
            );
            break;

          default:
            toast.error("Could not create your account", {
              description: error.message,
            });
        }

        return;
      }

      if (!data) {
        toast.error("Could not create your account");
        return;
      }

      toast.success("Welcome to BookNook", {
        description: `Your reader's card is ready, ${values.name.split(" ")[0]} — happy browsing.`,
      });

      router.replace("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong");
    }
  };

  const onGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signIn.social({
        provider: "google",
        // Where Google sends the user back after consent.
        callbackURL: "/",
        // If Google denies access, land back on the register page.
        errorCallbackURL: "/register",
      });

      if (error) {
        toast.error(
          error.message ?? "Could not start Google sign-in. Please try again.",
        );
        return;
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast.error("Something went wrong", {
        description: "We couldn't start Google sign-in. Please try again.",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthVisual
        covers={[
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780735211292-L.jpg&w=480&fit=cover",
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780399590504-L.jpg&w=480&fit=cover",
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780393354324-L.jpg&w=480&fit=cover",
        ]}
      />

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <p className="eyebrow">Join the library</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
            Claim your reader's card
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              Sign in instead
            </Link>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
              noValidate
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <UserRound
                        aria-hidden
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                      />
                      <FormControl>
                        <Input
                          autoComplete="name"
                          placeholder="e.g. Riley Bennett"
                          className="h-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail
                        aria-hidden
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                      />
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className="h-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://… (optional)"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional — we'll conjure a friendly avatar if you leave it
                      empty.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <KeyRound
                        aria-hidden
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                      />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className="h-11 pr-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="text-muted-foreground hover:bg-accent hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff aria-hidden className="size-4" />
                        ) : (
                          <Eye aria-hidden className="size-4" />
                        )}
                      </button>
                    </div>
                    <PasswordChecklist password={password} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <KeyRound
                        aria-hidden
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                      />
                      <FormControl>
                        <Input
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className="h-11 pr-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                        className="text-muted-foreground hover:bg-accent hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff aria-hidden className="size-4" />
                        ) : (
                          <Eye aria-hidden className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 aria-hidden className="size-4.5 animate-spin" />
                    Printing your card…
                  </>
                ) : (
                  <>
                    <UserPlus aria-hidden className="size-4.5" />
                    Create Account
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3" aria-hidden>
                <span className="bg-border h-px flex-1" />
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  or
                </span>
                <span className="bg-border h-px flex-1" />
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-full"
                onClick={onGoogle}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <Loader2 aria-hidden className="size-4.5 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Sign up with Google
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
