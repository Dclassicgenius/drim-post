import { Post } from "@/.velite";
import Fuse from "fuse.js";

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
    includeMatches: true,
  });
}
