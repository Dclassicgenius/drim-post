import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Overpass } from "next/font/google";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  fromColor?: string;
  toColor?: string;
  classname?: string;
}

const overPass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export function Tag({
  tag,
  current,
  count,
  fromColor,
  toColor,
  classname,
}: TagProps) {
  if (!tag) return;

  return (
    <Link
      className={badgeVariants({
        variant: current ? "outline" : "outline",
        className:
          "no-underline rounded-md transition-transform duration-300 hover:scale-105",
      })}
      href={`/tags/${slug(tag)}`}
    >
      <span
        className={cn(
          ` bg-clip-text text-transparent p-1 font-medium text-base inline-block capitalize transition-all duration-300 ease-in-out`,
          overPass.className,
          classname
        )}
        style={{
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        }}
      >
        {tag} {count ? `(${count})` : null}
      </span>
    </Link>
  );
}
