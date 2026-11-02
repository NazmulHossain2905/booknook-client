"use client";

import { UserAvatar } from "@/components/shared/book-cover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { User } from "@/types";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserMenu({ user }: { user: User }) {
  if (!user) return null;

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { data } = await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            // router.refresh();
          },
        },
      });

      if (data?.success) {
        toast.success("Sign-out successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-ring/50 rounded-full outline-none focus-visible:ring-[3px]">
        <UserAvatar
          src={user.image!}
          name={user.name}
          className="size-9 transition-transform hover:scale-105"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserRound aria-hidden className="size-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          variant="destructive"
          className="cursor-pointer"
        >
          <LogOut aria-hidden className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
