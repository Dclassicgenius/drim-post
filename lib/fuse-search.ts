import { Post } from "@/.velite";
import Fuse from "fuse.js";

export interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  summary: string;
  content: string;
  tags: string[];
}

export function createSearchIndex(posts: Post[]) {
  const searchablePosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description || "",
    summary: post.summary || "",
    content: post.body,
    tags: post.tags || [],
  }));

  return new Fuse(searchablePosts, {
    keys: [
      {
        name: "title",
        weight: 0.4,
      },
      {
        name: "description",
        weight: 0.3,
      },
      {
        name: "summary",
        weight: 0.3,
      },
      {
        name: "content",
        weight: 0.2,
      },
      {
        name: "tags",
        weight: 0.1,
      },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}

export function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(
    regex,
    '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>'
  );
}

export function getTextSnippet(
  text: string,
  query: string,
  snippetLength = 150
): string {
  const cleanText = text.replace(/[{}[\]()]/g, "");
  const index = cleanText.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) {
    return cleanText.slice(0, snippetLength) + "...";
  }

  const start = Math.max(0, index - snippetLength / 2);
  const end = Math.min(
    cleanText.length,
    index + query.length + snippetLength / 2
  );

  return (
    (start > 0 ? "..." : "") +
    cleanText.slice(start, end).trim() +
    (end < cleanText.length ? "..." : "")
  );
}
