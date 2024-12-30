import { posts } from "#site/content";
import { cn, sortPosts } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import PostList from "./PostList";

const latestPosts = sortPosts(posts, "desc").slice(0, 5);

const LatestPosts = () => {
  return (
    <div className="flex-1">
      <h1 className="mb-10 font-bold text-4xl text-pink-700">
        Latest Articles and Tutorials
      </h1>

      <PostList posts={latestPosts} />

      <div className="justify-self-center mt-3 transition-transform duration-200 hover:scale-105">
        <Link href="/posts">
          <button
            className={cn(
              "inline-flex h-12 animate-shimmer items-center justify-center rounded-md",
              "border transition-colors focus:outline-none focus:ring-2",
              "pl-2 pr-10 font-medium text-xl group",
              // Light mode
              "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100",
              "border-slate-300 text-slate-600",
              "hover:text-slate-900 hover:border-slate-400",
              "focus:ring-slate-400 focus:ring-offset-2",
              // Dark mode
              "dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
              "dark:border-slate-700 dark:text-slate-400",
              "dark:hover:text-slate-200 dark:hover:border-slate-600",
              "dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900",
              "bg-[length:200%_100%]"
            )}
          >
            <span
              className={cn(
                "mr-8 p-1 border rounded-sm transition-transform group-hover:animate-bounce-x",
                "bg-slate-200 border-slate-300",
                "dark:bg-slate-800 dark:border-slate-700"
              )}
            >
              <MoveRight />
            </span>{" "}
            View all posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestPosts;
