"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { navMenu } from "@/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="sr-only">
          <SheetTitle>DrimBlog Mobile Menu</SheetTitle>
          <SheetDescription>Mobile menu with links</SheetDescription>
        </SheetHeader>
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <span className="text-2xl font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          {navMenu.map((item) => (
            <MobileLink key={item.name} onOpenChange={setOpen} href={item.href}>
              {item.name}
            </MobileLink>
          ))}

          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            GitHub
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  target?: string;
  rel?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  target,
  rel,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
