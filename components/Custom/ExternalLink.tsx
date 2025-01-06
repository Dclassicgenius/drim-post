import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("https");

  if (!isExternal) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
