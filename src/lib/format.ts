import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** "16 Oct 2026" */

export function formatDate(value: string | Date): string {
  try {
    const date = value instanceof Date ? value : parseISO(value);

    if (!isValid(date)) return "Invalid date";

    return format(date, "d MMM yyyy");
  } catch {
    return "Invalid date";
  }
}

/** Whole days from now until the ISO date (negative = overdue) */
export function daysUntil(iso: string): number {
  try {
    return differenceInCalendarDays(parseISO(iso), new Date());
  } catch {
    return 0;
  }
}

/** Human friendly due copy, e.g. "Due in 3 days" / "Overdue by 2 days" */
export function dueLabel(iso: string): string {
  const days = daysUntil(iso);
  if (days > 1) return `Due in ${days} days`;
  if (days === 1) return "Due tomorrow";
  if (days === 0) return "Due today";
  if (days === -1) return "Overdue by 1 day";
  return `Overdue by ${Math.abs(days)} days`;
}
