import { getAllTags } from "@/lib/utils";
import { posts } from "#site/content";

import LatestPosts from "../Posts/LatestPosts";
import TagList from "../Tags/TagList";
import PopularPosts from "../Posts/PopularPosts";

const HomeContent = () => {
  const tags = getAllTags(posts);

  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-10 my-10 px-6">
      <LatestPosts />

      <aside className="md:w-1/4 space-y-6">
        <div>
          <h2 className="mb-6 font-bold text-3xl text-pink-700">
            Browse By Tags
          </h2>

          <TagList tags={tags} />
        </div>

        <div>
          <h2 className="mb-6 font-bold text-3xl text-pink-700">
            Popular Contents
          </h2>

          <PopularPosts />
        </div>
      </aside>
    </section>
  );
};

export default HomeContent;
