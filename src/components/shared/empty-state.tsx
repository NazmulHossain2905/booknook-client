"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void; href?: string };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-card/60 flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center",
        className,
      )}
    >
      <div className="bg-secondary text-primary relative mb-5 flex size-16 items-center justify-center rounded-full">
        <Icon aria-hidden className="size-7" />
        <span
          aria-hidden
          className="bg-gold absolute -top-1 -right-1 size-3 rounded-full"
        />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        {description}
      </p>
      {action &&
        (action.href ? (
          <Button asChild className="mt-6">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button className="mt-6" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
    </div>
  );
}
