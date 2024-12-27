import { posts } from "#site/content";
import Post from "@/components/Posts/Post";
import { Tag } from "@/components/Tags/Tag";
import {
  calculateReadingTime,
  getAllTags,
  getGradientColor,
  getPostsByTagSlug,
  sortTagsByCount,
} from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts
    .map((post) => ({
      ...post,
      readingTime: calculateReadingTime(post.body),
    }))
    .filter((post) => post.published);

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  const tagsWithGradient = sortedTags.map((label) => ({
    label,
    ...getGradientColor(label),
  }));

  return (
    <div className="container max-w-5xl mx-auto p-6 lg:py-10">
      <div className="flex-1 space-y-4">
        <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-pink-700">
          {title}
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-8">
        <div className="col-span-12 md:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col mt-8 space-y-10">
              {displayPosts.map((post) => {
                return (
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
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <aside className="col-span-12 md:col-span-4">
          <div className="sticky top-24 border rounded-lg p-4">
            <h2 className="mb-6 font-bold text-3xl text-pink-700">Tags</h2>
            <ul className="flex flex-wrap gap-3">
              {tagsWithGradient.map((t) => (
                <li key={t.label}>
                  <Tag
                    tag={t.label}
                    fromColor={t.fromColor}
                    toColor={t.toColor}
                    count={tags[t.label]}
                    current={slug(t.label) === tag}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
