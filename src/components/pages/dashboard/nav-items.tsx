"use client";

import {cn} from "@/lib/utils";
import {Newspaper} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavItems: React.FC = () => {
  const pathName = usePathname();

  const navItems = [
    {
      label: "Resumes",
      icon: Newspaper,
      path: "/dashboard/resumes",
    },
  ];

  return (
    <nav className="w-full flex flex-col gap-2 px-2 py-4">
      <ul>
        {navItems.map((item, index) => {
          const isActive = pathName.startsWith(item.path);

          return (
            <li key={index}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md hover:bg-muted",
                  isActive && "bg-accent"
                )}
              >
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavItems;
