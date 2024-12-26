"use client";

import { cn } from "@/lib/utils";
import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export const ToC = ({ toc, depth = 0 }: { toc: TocEntry; depth?: number }) => {
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = Object.values(headingElementsRef.current)
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -35% 0px",
      threshold: 0.75,
    });

    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  const isActive = toc.id === activeId;

  return (
    <>
      <li className="group" style={{ paddingLeft: `${depth * 1}rem` }}>
        <Link
          href={`#${toc.id}`}
          scroll={false}
          onClick={() => scrollTo(toc.id as string)}
          className={cn(
            "no-underline transition-colors duration-300 flex",
            isActive
              ? "text-purple-600"
              : "text-muted-foreground hover:text-purple-500"
          )}
        >
          <span className="relative">
            <span className="text-sm font-medium">{toc.value}</span>
          </span>
        </Link>
      </li>
      {toc.children?.map((child) => (
        <ToC key={child.id} toc={child} depth={depth + 1} />
      ))}
    </>
  );
};
