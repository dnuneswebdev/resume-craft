"use client";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {LogOut, SquareUser} from "lucide-react";
import {User} from "next-auth";
import {signOut} from "next-auth/react";

type UserDropdownProps = {
  user?: User;
};

export const UserDropdown = ({user}: UserDropdownProps) => {
  if (!user) return null;

  const initials = user?.name
    ?.split(" ")
    ?.slice(0, 2)
    .map((name) => name[0])
    .join("");
  //splita as palavaras do nome, ex: 1-Daniel 2-Nunes. e pega só os dois primeiros nomes caso a pessoa tenha mais.
  //Depois pega a primeira letra de cada palavra e junta em uma string

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full gap-2 justify-start px-2">
          <Avatar className="w-7 h-7 block">
            <AvatarImage src={user?.image ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <Link passHref href="/dashboard/account">
          <DropdownMenuItem className="gap-2">
            <SquareUser size={16} />
            Account Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="gap-2 text-red-500"
          onClick={() => signOut({callbackUrl: "/auth/login"})}
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
