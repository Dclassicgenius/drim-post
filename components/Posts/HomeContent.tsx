import {
  getAllTags,
  getGradientColor,
  sortPosts,
  sortTagsByCount,
} from "@/lib/utils";
import { Tag } from "../Tags/Tag";
import { posts } from "#site/content";
import Post from "./Post";

const HomeContent = () => {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  const tagsWithGradient = sortedTags.map((label) => ({
    label,
    ...getGradientColor(label),
  }));

  const latestPosts = sortPosts(posts, "desc").slice(0, 5);

  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-10 my-10 px-6">
      <div className="flex-1">
        <h1 className="mb-10 font-bold text-4xl text-pink-700">
          Latest Articles and Tutorials
        </h1>

        <ul className="space-y-10">
          {latestPosts.map(
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
                  />
                </li>
              )
          )}
        </ul>
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
