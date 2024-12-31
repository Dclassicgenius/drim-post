import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Overpass_Mono } from "next/font/google";

export interface TagProps {
  label: string;
  current?: boolean;
  count?: number;
  fromColor?: string;
  toColor?: string;
  classname?: string;
}

const overpassMono = Overpass_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-overpass-mono",
});

export function Tag({
  label,
  current,
  count,
  fromColor,
  toColor,
  classname,
}: TagProps) {
  return (
    <>
      {current ? (
        <button className="p-[3px] relative cursor-default">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
            }}
          />
          <div
            className={cn(
              "px-4 py-1  bg-background rounded-[6px]  relative group transition duration-200 text-foreground hover:bg-transparent font-medium text-base inline-block capitalize",
              overpassMono.className,
              classname
            )}
          >
            {label} {count ? `(${count})` : null}
          </div>
        </button>
      ) : (
        <Link
          className={badgeVariants({
            variant: "outline",
            className:
              "no-underline rounded-md transition-transform duration-300 hover:scale-105",
          })}
          href={`/tags/${slug(label)}`}
        >
          <span
            className={cn(
              ` bg-clip-text text-transparent p-1 font-medium text-base inline-block capitalize transition-all duration-300 ease-in-out`,
              overpassMono.className,
              classname
            )}
            style={{
              backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
            }}
          >
            {label} {count ? `(${count})` : null}
          </span>
        </Link>
      )}
    </>
  );
}
