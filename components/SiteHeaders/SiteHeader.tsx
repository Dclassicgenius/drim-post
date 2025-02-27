import React, { Suspense } from "react";
import MainNav from "./MainNav";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons/Icons";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { MobileNav } from "./MobileNav";
import Search from "../Search/Search";

const SiteHeader = () => {
  return (
    <header className="z-40 sticky flex items-center h-20 top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 ">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto">
        <MainNav />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center sm:space-x-3">
            <div
              className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 ")}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Search />
              </Suspense>
              <span className="sr-only">Magnifying Glass</span>
            </div>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="mr-2 md:mr-0"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                <Icons.gitHub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            <ThemeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
