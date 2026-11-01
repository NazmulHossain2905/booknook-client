import { cn } from "@/lib/utils";
import { Category } from "@/types";

const CATEGORY_STYLES: Record<Category, string> = {
  Fiction: "bg-[#f3e8dd] text-[#7c4a2d] dark:bg-[#3a2a20] dark:text-[#e3b58f]",
  Science: "bg-[#e2ecdf] text-[#2f5d3a] dark:bg-[#22301f] dark:text-[#a8cfa8]",
  History: "bg-[#f0e6cf] text-[#7a5d1e] dark:bg-[#332c19] dark:text-[#dcc27c]",
  Kids: "bg-[#e9e2f0] text-[#5c4470] dark:bg-[#2a2333] dark:text-[#c5b0d8]",
  Others: "bg-[#e4e7e2] text-[#4a5442] dark:bg-[#242923] dark:text-[#b7c1af]",
};

export function CategoryBadge({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Others,
        className,
      )}
    >
      {category}
    </span>
  );
}
