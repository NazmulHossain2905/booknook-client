import { cn } from "cn";
import { Check } from "lucide-react";

export function PasswordChecklist({ password }: { password: string }) {
  const rules = [
    { label: "At least 6 characters", ok: password.length >= 6 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(password) },
  ];
  return (
    <ul className="mt-3 space-y-1.5" aria-label="Password requirements">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={cn(
            "flex items-center gap-2 text-xs transition-colors",
            rule.ok ? "text-primary" : "text-muted-foreground",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex size-4 items-center justify-center rounded-full border transition-colors",
              rule.ok
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border",
            )}
          >
            {rule.ok && <Check className="size-2.5" />}
          </span>
          <span aria-hidden>{rule.label}</span>
          <span className="sr-only" aria-live="polite">
            {rule.label}: {rule.ok ? "requirement met" : "requirement not met"}
          </span>
        </li>
      ))}
    </ul>
  );
}
