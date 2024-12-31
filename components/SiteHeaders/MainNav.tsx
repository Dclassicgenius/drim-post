"use client";

import Link from "next/link";
import React from "react";
import { siteConfig } from "@/config/site";
import { navMenu } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8 lg:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold">{siteConfig.name}</span>
      </Link>
      <ul className="flex items-center gap-6">
        {navMenu.map((item) => (
          <li key={item.name} className=" list-none">
            <Link
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary hidden sm:inline-block",
                pathname === item.href || pathname.includes(item.href)
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
