import { posts } from "#site/content";
import { MDXContent, MDXToC } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Tag } from "@/components/Tags/Tag";
import {
  calculateReadingTime,
  formatDate,
  getTagsWithGradient,
} from "@/lib/utils";
import { Clock } from "lucide-react";
import { ToC } from "@/components/OnThisPage/ToC";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  const tagsWithGradient = getTagsWithGradient(post?.tags ?? []);

  const readingTime = calculateReadingTime(post.body);

  const tableOfContents = MDXToC({ code: post.body });

  return (
    <div className="container px-4 md:px-6 mx-auto mb-6">
      <article className="max-w-5xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] gap-8 md:gap-12">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="mb-2">{post.title}</h1>
            <div className="flex flex-wrap gap-3 my-3">
              {tagsWithGradient?.map((tag) => (
                <Tag
                  key={tag.label}
                  tag={tag.label}
                  fromColor={tag.fromColor}
                  toColor={tag.toColor}
                  classname="text-xs font-medium p-0.5"
                />
              ))}
            </div>
            {post.description && (
              <p className="text-xl mt-0 text-muted-foreground">
                {post.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:gap-4 tracking-wider">
              <p className="m-0">Published on {formatDate(post.date)} </p>
              {post.updatedOn && <span className="hidden sm:block">•</span>}
              {post.updatedOn && (
                <p className="m-0">
                  Last updated on {formatDate(post.updatedOn)}{" "}
                </p>
              )}
            </div>

            <p className="m-0 mt-3 flex items-center gap-1">
              <Clock className="h-4 w-4" /> {readingTime}
            </p>

            <hr className="my-4" />
            <MDXContent code={post.body} />
          </div>

          <aside className="order-first md:order-last mt-8">
            <div className="md:sticky md:top-24">
              <div className="border rounded-lg p-4 bg-card">
                <h2 className="text-lg font-semibold mb-4">
                  Table of Contents
                </h2>
                <nav className="overflow-y-auto max-h-[calc(100vh-200px)]">
                  <ul className="space-y-2">
                    {tableOfContents.map((toc) => (
                      <ToC key={toc.id} toc={toc} />
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
