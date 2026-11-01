"use client";

import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BookCoverProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  framed?: boolean;
  className?: string;
}

export function BookCover({
  src,
  alt,
  framed = true,
  className,
  ...props
}: BookCoverProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed || !src) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={cn(
          "from-primary/90 to-primary text-primary-foreground flex aspect-2/3 w-full flex-col items-center justify-center gap-2 bg-linear-to-br px-3 text-center",
          framed && "overflow-hidden rounded-lg",
          className,
        )}
      >
        <span className="font-display text-lg leading-snug">{alt}</span>
        <span aria-hidden className="bg-gold h-px w-8" />
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-80">
          BookNook
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        "aspect-2/3 w-full object-cover",
        framed && "rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

/** Square avatar with initials fallback. */
export function UserAvatar({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  if (failed || !src) {
    return (
      <div
        aria-hidden
        className={cn(
          "bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          className,
        )}
      >
        {initials(name)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${name}'s avatar`}
      onError={() => setFailed(true)}
      className={cn(
        "ring-background size-9 shrink-0 rounded-full object-cover ring-2",
        className,
      )}
    />
  );
}
