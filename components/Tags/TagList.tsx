import { TagType } from "@/lib/utils";
import { Tag } from "./Tag";
import { slug } from "github-slugger";

type TagListProps = {
  tags?: TagType[];
  showCount?: boolean;
  tagSlug?: string;
  classname?: string;
  insideLink?: boolean;
};

const TagList = ({ tags, showCount, tagSlug, classname }: TagListProps) => {
  return (
    <ul className="flex flex-wrap gap-3">
      {tags?.map((tag) => (
        <li key={tag.label} className="list-none">
          <Tag
            label={tag.label}
            fromColor={tag.fromColor}
            toColor={tag.toColor}
            classname={classname}
            count={showCount ? tag.count : undefined}
            current={slug(tag.label) === tagSlug}
          />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
