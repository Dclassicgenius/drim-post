import { posts } from "#site/content";
import PostList from "@/components/Posts/PostList";
import TagList from "@/components/Tags/TagList";
import { getAllTags, sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drimblog Posts",
  description: "All posts from Drimblog",
};

const tags = getAllTags(posts);

const allPosts = sortPosts(posts, "desc");

const PostsPage = () => {
  return (
    <section className="container max-w-6xl mx-auto flex flex-col md:flex-row gap-10 my-10 px-6">
      <div className="flex-1">
        <h1 className="mb-10 font-bold text-4xl text-pink-700">All Posts</h1>

        <PostList posts={allPosts} />
      </div>

      <aside className="md:w-[35%] space-y-6 border-2 0 rounded-lg p-4 h-fit md:mt-16 order-first md:order-last md:sticky md:top-24 mt-8">
        <h2 className="mb-6 font-bold text-3xl text-pink-700">Tags</h2>

        <TagList tags={tags} showCount />
      </aside>
    </section>
  );
};

export default PostsPage;
