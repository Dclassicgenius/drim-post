import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Tag } from "../Tags/Tag";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn, formatDate, getGradientColor } from "@/lib/utils";
import { Overpass } from "next/font/google";

type PostProps = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  summary?: string;
  slug: string;
};

const overPass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const Post = ({ title, description, date, tags, summary, slug }: PostProps) => {
  const tagsWithGradient =
    tags &&
    tags.map((label) => ({
      label,
      ...getGradientColor(label),
    }));

  return (
    <article className="space-y-4 group">
      <h2 className="text-3xl font-bold hover:underline hover:decoration-purple-600 mb-4">
        <Link href={"/" + slug}>{title}</Link>
      </h2>
      <ul className="flex flex-wrap gap-3">
        {tagsWithGradient?.map((tag) => (
          <li key={tag.label}>
            <Tag
              tag={tag.label}
              fromColor={tag.fromColor}
              toColor={tag.toColor}
              classname="text-xs font-medium p-0.5"
            />
          </li>
        ))}
      </ul>
      <div className="max-w-none text-muted-foreground text-base">
        {summary}
      </div>
      <p className={cn("text-xl font-medium", overPass.className)}>
        {description}
      </p>
      <div className={overPass.className}>
        <dl className="flex gap-4">
          <dt className="sr-only">Published On & Reading Time</dt>
          <dd className="text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time className="" dateTime={date}>
              {formatDate(date)}
            </time>
          </dd>

          <dt className="sr-only">Reading Time</dt>
          <dd className="text-base font-medium flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-base ">5 mins read</span>
          </dd>
        </dl>
      </div>

      <Link
        href={"/" + slug}
        className={cn(
          buttonVariants({ variant: "link" }),
          "font-bold text-xl hover:translate-x-1 transition-all duration-300 p-0 mt-0 hover:underline hover:decoration-purple-600"
        )}
      >
        Read More{" "}
        <ArrowUpRight className="w-6 h-6 transform rotate-0 group-hover:rotate-45 transition-all duration-300" />
      </Link>
    </article>
  );
};

export default Post;
