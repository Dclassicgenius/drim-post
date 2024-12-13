import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "../ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}
export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/tags/${slug(tag)}`}
    >
      <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
        {tag} {count ? `(${count})` : null}
      </span>
    </Link>
  );
}
