"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  theme?: "dark" | "light";
  highlightLines?: number[];
  caption?: string;
  maxHeight?: string;
}

export function CodeBlock({
  className,
  code,
  language,
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  theme = "dark",
  highlightLines = [],
  //   caption,
  maxHeight,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = code?.split("\n") || [];

  const renderLineNumbers = () => {
    return (
      <div className="select-none text-zinc-500 text-right pr-4 border-r border-zinc-700">
        {lines.map((_, index) => (
          <div
            key={index + 1}
            className={cn(
              "px-2",
              highlightLines.includes(index + 1) && "bg-zinc-800 text-zinc-300"
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  const copyToClipboard = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="absolute top-0 left-0 px-4 py-2 text-xs text-zinc-400 bg-zinc-800 rounded-t-lg">
          {filename}
        </div>
      )}
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-400 hover:text-zinc-100" />
          )}
        </button>
      )}
      <pre
        className={cn(
          "mb-4 mt-2 overflow-x-auto rounded-lg py-4",
          "text-sm [&_pre]:bg-transparent [&_pre]:p-0",
          theme === "dark" ? "bg-zinc-900" : "bg-zinc-50",
          (filename || language) && "pt-12",
          maxHeight && `max-h-[${maxHeight}]`,
          className
        )}
        {...props}
      >
        <div className="flex">
          {showLineNumbers && renderLineNumbers()}
          <code
            className={cn(
              "px-4 flex-1",
              language ? `language-${language}` : undefined
            )}
          >
            {code}
          </code>
        </div>
      </pre>
      {/* ...existing caption code... */}
    </div>
  );
}
