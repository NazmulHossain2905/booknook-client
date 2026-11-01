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
import { demoUser } from "@/data";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const user = demoUser;

  if (!user) return null;

  const handleLogout = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-ring/50 rounded-full outline-none focus-visible:ring-[3px]">
        <UserAvatar
          src={user.avatar}
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
        <Link href="/profile" className="cursor-pointer">
          <DropdownMenuItem>
            <UserRound className="size-4" />
            My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
