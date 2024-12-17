import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Tag } from "../Tags/Tag";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn, formatDate, getGradientColor } from "@/lib/utils";

type PostProps = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  summary?: string;
  slug: string;
};

const Post = ({ title, description, date, tags, summary, slug }: PostProps) => {
  const tagsWithGradient =
    tags &&
    tags.map((label) => ({
      label,
      ...getGradientColor(label),
    }));

  return (
    <article className="space-y-3 group">
      <h2 className="text-2xl font-bold hover:underline hover:decoration-purple-600 mb-4">
        <Link href={"/" + slug}>{title}</Link>
      </h2>
      <div className="flex flex-wrap gap-3">
        {tagsWithGradient?.map((tag) => (
          <Tag
            key={tag.label}
            tag={tag.label}
            fromColor={tag.fromColor}
            toColor={tag.toColor}
          />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground text-sm">{summary}</div>
      <p>{description}</p>
      <div>
        <dl className="flex gap-4">
          <dt className="sr-only">Published On & Reading Time</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>

          <dt className="sr-only">Reading Time</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm sm:text-base font-medium">
              5 mins read
            </span>
          </dd>
        </dl>
      </div>

      <Link
        href={"/" + slug}
        className={cn(
          buttonVariants({ variant: "link" }),
          "font-semibold text-lg hover:translate-x-1 transition-all duration-300 p-0 mt-0 hover:underline hover:decoration-purple-600"
        )}
      >
        Read More{" "}
        <ArrowUpRight className="w-6 h-6 transform rotate-0 group-hover:rotate-45 transition-all duration-300" />
      </Link>
    </article>
  );
};

export default Post;
