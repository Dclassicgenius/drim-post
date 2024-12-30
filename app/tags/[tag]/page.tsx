import { posts } from "#site/content";
import PostList from "@/components/Posts/PostList";
import TagList from "@/components/Tags/TagList";
import { getAllTags, getPostsByTagSlug } from "@/lib/utils";
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
  const displayPosts = allPosts.filter((post) => post.published);

  const tags = getAllTags(posts);

  return (
    <div className="container max-w-6xl mx-auto p-6 lg:py-10">
      <div className="flex-1 space-y-4">
        <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-pink-700">
          {title}
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 md:col-span-8">
          <hr />

          {displayPosts?.length > 0 ? (
            <div className="mt-8">
              <PostList posts={displayPosts} />
            </div>
          ) : (
            <p>No Posts yet</p>
          )}
        </div>
        <aside className="col-span-12 md:col-span-4">
          <div className="sticky top-24 border rounded-lg p-4">
            <h2 className="mb-6 font-bold text-3xl text-pink-700">Tags</h2>

            <TagList tags={tags} tagSlug={tag} showCount />
          </div>
        </aside>
      </div>
    </div>
  );
}
