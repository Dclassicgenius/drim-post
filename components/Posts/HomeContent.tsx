import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Tag } from "../Tags/Tag";
import { posts } from "#site/content";
import Post from "./Post";

const HomeContent = () => {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <section className="container mx-auto flex flex-col md:flex-row md:gap-10 my-10 px-6">
      <div className="flex-1">
        <h1 className="mb-6 font-bold text-4xl text-pink-700">
          Latest Articles and Tutorials
        </h1>

        <div className="space-y-6">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <Post key={i} />
          ))}
        </div>
      </div>

      <aside className="md:w-1/4 space-y-6">
        <div>
          <h2 className="mb-6 font-bold text-3xl text-pink-700">
            Browse By Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {sortedTags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
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
