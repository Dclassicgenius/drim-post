import { ArrowUpRight, Calendar } from "lucide-react";
import { Tag } from "../Tags/Tag";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Post = () => {
  return (
    <article className="space-y-3 group">
      <h2 className="font-bold text-2xl">CSS in React Server Components</h2>
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 3 }, (_, i) => i).map((i) => (
          <Tag key={i} tag={`Tag #${i}`} />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground text-sm">
        You can’t make an omelette without cracking a few eggs, and when the
      </div>
      <p>
        You can’t make an omelette without cracking a few eggs, and when the
        core React team unveiled their vision for the future of React, some of
        my favourite libraries got scrambled 😅. In this blog post, we’re going
        to explore the compatibility issues between React Server Components and
        CSS-in-JS libraries like styled-components. You’ll understand what the
        issue is, what the options are, and what’s on the horizon.
      </p>
      <div>
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={"2023-03-01T00:00:00.000Z"}>March 1, 2023</time>
          </dd>
        </dl>
      </div>

      <Link
        href={"/"}
        className={cn(
          buttonVariants({ variant: "link" }),
          "font-semibold hover:translate-x-1 transition-all duration-300 p-0 mt-0"
        )}
      >
        Read More{" "}
        <ArrowUpRight className="w-6 h-6 transform rotate-0 group-hover:rotate-45 transition-all duration-300" />
      </Link>
    </article>
  );
};

export default Post;
