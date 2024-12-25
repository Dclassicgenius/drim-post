"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export interface LinkType {
  id: string;
  text: string;
  level: number;
}

const OnThisPage = ({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className?: string;
}) => {
  const [linkHeadings, setLinkHeadings] = useState<LinkType[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    const extractHeadings = (html: string): LinkType[] => {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(html, "text/html");

      const headingAnchors = doc.querySelectorAll("a.subheading-anchor");

      return Array.from(headingAnchors)
        .map((anchor, index) => {
          const headingElement = anchor.closest("h1, h2, h3, h4, h5, h6");
          if (!headingElement) return null;

          const id =
            anchor.getAttribute("href")?.replace("#", "") || `heading-${index}`;
          const level = parseInt(headingElement.tagName.charAt(1));
          const text = anchor.textContent || "";

          return {
            id,
            text,
            level,
          };
        })
        .filter((heading): heading is LinkType => heading !== null);
    };

    setLinkHeadings(extractHeadings(htmlContent));
  }, [htmlContent]);

  useEffect(() => {
    if (linkHeadings.length === 0) return;

    const handleIntersections = (entries: IntersectionObserverEntry[]) => {
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

    const observer = new IntersectionObserver(handleIntersections, {
      root: null,
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    });

    linkHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [linkHeadings]);

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (linkHeadings.length === 0) return null;

  return (
    <aside className={cn("w-64 shrink-0", className)}>
      <nav className="sticky top-16">
        <h2 className="font-medium mb-4 text-sm">On this page</h2>
        <ul className="space-y-2.5">
          {linkHeadings.map((link) => (
            <li
              key={link.id}
              style={{
                paddingLeft: `${(link.level - 1) * 0.75}rem`,
                fontSize: link.level === 1 ? "0.875rem" : "0.75rem",
              }}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={cn(
                  "inline-block text-muted-foreground hover:text-foreground transition-colors",
                  activeId === link.id && "text-foreground font-medium"
                )}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default OnThisPage;
