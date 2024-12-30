import { posts } from "#site/content";
import TagList from "@/components/Tags/TagList";
import { getAllTags } from "@/lib/utils";

const tags = getAllTags(posts);

const AllTagsPage = () => {
  return (
    <section className="container max-w-5xl mx-auto my-10 px-6">
      <h2 className="mb-6 font-bold text-3xl text-pink-700">Tags</h2>

      <TagList tags={tags} showCount />
      
    </section>
  );
};

export default AllTagsPage;
