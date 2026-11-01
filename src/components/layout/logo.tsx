import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn("shrink-0", className)}
    >
      <rect x="1" y="1" width="46" height="46" rx="13" fill="var(--primary)" />
      <path
        d="M24 17.5c-2.9-2.6-7.4-3.6-12.5-3V32c5.1-.6 9.6.4 12.5 3 2.9-2.6 7.4-3.6 12.5-3V14.5c-5.1-.6-9.6.4-12.5 3Z"
        fill="var(--primary-foreground)"
      />
      <path
        d="M24 17.5V35"
        stroke="var(--primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M33.5 4.5h8.5v11l-4.25-3-4.25 3v-11Z" fill="var(--gold)" />
    </svg>
  );
}

export function LogoWordMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Logo size={compact ? 30 : 34} />
      <span className="font-display text-[1.35rem] leading-none font-semibold tracking-tight">
        Book<span className="text-primary">Nook</span>
      </span>
    </span>
  );
}
