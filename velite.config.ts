import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@stefanprobst/rehype-extract-toc";
import rehypeTocExtract from "@stefanprobst/rehype-extract-toc/mdx";
import { transformerCopyButton } from "@rehype-pretty/transformers";

const options = {
  theme: "dracula",
  transformers: [
    transformerCopyButton({
      visibility: "always",
      feedbackDuration: 3_000,
    }),
  ],
};

const computedFields = <
  T extends { slug: string; meta: { readingTime: number } }
>(
  data: T
) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  readingTime: data.meta.readingTime,
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
      updatedOn: s.isodate().optional(),
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
      [rehypePrettyCode, options],
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
