import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@stefanprobst/rehype-extract-toc";
import rehypeTocExtract from "@stefanprobst/rehype-extract-toc/mdx";
import { promisify } from "util";
import { exec } from "child_process";

const computedFields = <
  T extends { slug: string; meta: { readingTime: number } }
>(
  data: T
) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  readingTime: data.meta.readingTime,
});

const execAsync = promisify(exec);

const getGitLastModifiedDate = () =>
  s
    .custom<string | undefined>((i) => i === undefined || typeof i === "string")
    .transform<string>(async (value, { meta, addIssue }) => {
      try {
        if (value != null) {
          addIssue({
            fatal: false,
            code: "custom",
            message:
              "`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`",
          });
        }

        const { stdout } = await execAsync(
          `git log -1 --format=%cd -- "${meta.path}"`
        );
        return new Date(stdout).toISOString();
      } catch {
        return new Date().toISOString();
      }
    });

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      updatedOn: getGitLastModifiedDate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      image: s.string().optional(),
      author: s.string().optional(),
      summary: s.string().optional(),
      rawContent: s.raw(),
      meta: s.metadata(),
      excerpt: s.excerpt(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeToc,
      [rehypeTocExtract, { name: "toc" }],
      [rehypePrettyCode, { theme: "dracula" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
