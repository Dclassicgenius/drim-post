"use client";

import { useMemo } from "react";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  toc: Toc;
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const items = useMemo(() => {
    return toc.map((item) => ({
      ...item,
      level: Math.min(item.depth, 3),
    }));
  }, [toc]);

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
            item.level === 2 && "pl-4",
            item.level === 3 && "pl-8"
          )}
        >
          {item.value}
        </a>
      ))}
    </nav>
  );
}
