import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { slug } from "github-slugger";
import { categories } from "@/constants";

export type TagType = {
  label: string;
  fromColor?: string;
  toColor?: string;
  count?: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const parts = formattedDate.split(" ");
  const day = parseInt(parts[0], 10);
  const ordinalDay = getOrdinalSuffix(day);
  return `${ordinalDay} ${parts[1]}, ${parts[2]}`;
}

export function sortPosts(
  posts: Array<Post>,
  order: "asc" | "desc" = "desc"
): Array<Post> {
  if (!posts || posts.length === 0) return [];

  return posts.sort((a, b) => {
    if (order === "asc") {
      return new Date(a.date) > new Date(b.date) ? 1 : -1;
    }

    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  });
}

export function getAllTags(posts: Array<Post>) {
  if (!posts || posts.length === 0) return [];

  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.published) {
      if (post.tags) {
        post.tags.forEach((tag) => {
          const normalizedTag = tag.toLowerCase();
          tags[normalizedTag] = (tags[normalizedTag] ?? 0) + 1;
        });
      }
    }
  });

  const tagsWithGradient = Object.entries(tags).map(([tag, count]) => ({
    label: tag,
    count,
    ...getGradientColor(tag),
  }));

  return tagsWithGradient.sort((a, b) => b.count - a.count);
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export const getGradientColor = (label: string) => {
  const category = categories.find(
    (category) =>
      category.label.toLocaleLowerCase() === label.toLocaleLowerCase()
  );
  if (category) {
    return {
      fromColor: category.fromColor,
      toColor: category.toColor,
    };
  }
};

export const getTagsWithGradient = (tags: string[]) => {
  if (!tags || tags.length === 0) return [];

  return tags.map((label) => ({
    label,
    ...getGradientColor(label),
  }));
};

export function formatReadingTime(minutes: number): string {
  return `${minutes} ${minutes === 1 ? "min" : "mins"} read`;
}
