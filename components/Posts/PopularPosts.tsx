import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { slug } from "github-slugger";

const PopularPosts = () => {
  const popularPosts = sortPosts(posts, "asc").slice(0, 5);
  return (
    <ul className="space-y-4">
      {popularPosts.map((post) => (
        <li
          className=" list-none hover:text-purple-600 hover:transition hover:translate-x-3"
          key={post.slug}
        >
          <div>
            <h2 className="text-lg flex gap-3 justify-items-center font-bold hover:underline hover:decoration-purple-600 mb-1">
              <MoveRight /> <Link href={"/" + slug}>{post.title}</Link>
            </h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PopularPosts;
