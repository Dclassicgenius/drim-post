import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("https");

  if (!isExternal) {
    return (
      <a
        href={href}
        className="no-underline hover:underline font-bold hover:decoration-purple-600"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
