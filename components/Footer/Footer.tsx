import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navMenu } from "@/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icons } from "../Icons/Icons";

const Footer = () => {
  return (
    <footer className="border-t mt-20">
      <div className="container px-4 md:px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="flex space-x-5">
              {navMenu.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-10 px-0 inline-flex"
                  )}
                >
                  <Icons.gitHub className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-10 px-0 inline-flex"
                  )}
                >
                  <Icons.twitter className="h-6 w-6" />
                  <span className="sr-only">twitter</span>
                </div>
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-10 px-0 inline-flex"
                  )}
                >
                  <Icons.mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
