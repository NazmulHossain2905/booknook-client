"use client";

import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { AuthVisual } from "@/components/shared/auth-visual";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/hooks/use-page-title";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function LoginContent() {
  usePageTitle("Login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    // const result = await login(values.email, values.password);
    // if (result.ok) {
    //   toast.success("Welcome back", { description: "Your reading nook kept your place." });
    //   router.replace(redirect);
    // } else {
    //   setFormError(result.message ?? "Could not sign you in. Please try again.");
    // }
  };

  const onGoogle = async () => {
    setGoogleLoading(true);
    try {
      // await loginWithGoogle();
      toast.success("Signed in with Google", {
        description: "Welcome to BookNook — this button is a visual demo.",
      });
      router.replace(redirect);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <p className="eyebrow">Welcome back</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
            Sign in to your nook
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            New to BookNook?{" "}
            <Link
              href="/register"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              Create a free account
            </Link>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
              noValidate
            >
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
                          autoComplete="current-password"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" defaultChecked />
                  <Label
                    htmlFor="remember"
                    className="text-muted-foreground cursor-pointer text-sm font-normal"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Demo only", {
                      description:
                        "Password recovery isn't wired up in this front-end demo — but your secret is safe with us.",
                    })
                  }
                  className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3.5 py-2.5 text-sm"
                >
                  {formError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 aria-hidden className="size-4.5 animate-spin" />
                    Unlocking the door…
                  </>
                ) : (
                  <>
                    <LogIn aria-hidden className="size-4.5" />
                    Sign In
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
                Continue with Google
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Visual panel */}
      <AuthVisual
        covers={[
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780525559474-L.jpg&w=480&fit=cover",
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780062316097-L.jpg&w=480&fit=cover",
          "https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/9780345539434-L.jpg&w=480&fit=cover",
        ]}
      />
    </div>
  );
}

export default function LoginView() {
  return (
    <React.Suspense fallback={null}>
      <LoginContent />
    </React.Suspense>
  );
}
