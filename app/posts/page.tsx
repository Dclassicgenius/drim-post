import { posts } from "#site/content";
import Post from "@/components/Posts/Post";
import { Tag } from "@/components/Tags/Tag";
import {
  getAllTags,
  sortTagsByCount,
  getGradientColor,
  sortPosts,
  calculateReadingTime,
} from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drimblog Posts",
  description: "All posts from Drimblog",
};

const PostsPage = () => {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  const tagsWithGradient = sortedTags.map((label) => ({
    label,
    ...getGradientColor(label),
  }));

  const latestPosts = sortPosts(posts, "desc");
  const latestPostsWithReadingTime = latestPosts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.body),
  }));

  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-10 my-10 px-6">
      <div className="flex-1">
        <h1 className="mb-10 font-bold text-4xl text-pink-700">All Posts</h1>

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
      </div>

      <aside className="md:w-[35%] space-y-6 border-2 0 rounded-lg p-4 h-fit md:mt-16 order-first md:order-last md:sticky md:top-24 mt-8">
        <h2 className="mb-6 font-bold text-3xl text-pink-700">Tags</h2>
        <ul className="flex flex-wrap gap-3">
          {tagsWithGradient.map((tag) => (
            <li key={tag.label}>
              <Tag
                tag={tag.label}
                fromColor={tag.fromColor}
                toColor={tag.toColor}
                count={tags[tag.label]}
              />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default PostsPage;
