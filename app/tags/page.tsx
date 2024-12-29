import { posts } from "#site/content";
import { Tag } from "@/components/Tags/Tag";
import { getAllTags, sortTagsByCount, getTagsWithGradient } from "@/lib/utils";

const tags = getAllTags(posts);
const sortedTags = sortTagsByCount(tags);

const tagsWithGradient = getTagsWithGradient(sortedTags);

const AllTagsPage = () => {
  return (
    <section className="container mx-auto my-10 px-6">
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
    </section>
  );
};

export default AllTagsPage;
