import {
  calculateReadingTime,
  cn,
  getAllTags,
  getTagsWithGradient,
  sortPosts,
  sortTagsByCount,
} from "@/lib/utils";
import { Tag } from "../Tags/Tag";
import { posts } from "#site/content";
import Post from "./Post";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const HomeContent = () => {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  const tagsWithGradient = getTagsWithGradient(sortedTags);

  const latestPosts = sortPosts(posts, "desc").slice(0, 5);
  const latestPostsWithReadingTime = latestPosts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.body),
  }));

  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-10 my-10 px-6">
      <div className="flex-1">
        <h1 className="mb-10 font-bold text-4xl text-pink-700">
          Latest Articles and Tutorials
        </h1>

        <ul className="space-y-10">
          {latestPostsWithReadingTime.map(
            (post) =>
              post.published && (
                <li key={post.slug}>
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description || ""}
                    date={post.date}
                    tags={post.tags}
                    summary={post.summary || ""}
                    slug={post.slug}
                    readingTime={post.readingTime}
                  />
                </li>
              )
          )}
        </ul>

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

      <aside className="md:w-1/4 space-y-6">
        <div>
          <h2 className="mb-6 font-bold text-3xl text-pink-700">
            Browse By Tags
          </h2>
          <ul className="flex flex-wrap gap-3">
            {tagsWithGradient.map((tag) => (
              <li key={tag.label}>
                <Tag
                  tag={tag.label}
                  fromColor={tag.fromColor}
                  toColor={tag.toColor}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 font-bold text-3xl text-pink-700">
            Popular Contents
          </h2>
        </div>
      </aside>
    </section>
  );
};

export default HomeContent;
