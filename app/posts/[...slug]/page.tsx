import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Tag } from "@/components/Tags/Tag";
import {
  calculateReadingTime,
  formatDate,
  getGradientColor,
} from "@/lib/utils";
import { Clock } from "lucide-react";
import OnThisPage from "@/components/OnThisPage/OnThisPage";

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

  const tagsWithGradient = post.tags?.map((label) => ({
    label,
    ...getGradientColor(label),
  }));

  const readingTime = calculateReadingTime(post.body);

  return (
    <article className="container px-6 prose dark:prose-invert max-w-3xl mx-auto mt-8 md:grid md:grid-flow-col md:grid-cols-5 md:gap-6 lg:grid-cols-4 lg:gap-8">
      <div className="md:col-span-4 lg:col-span-3">
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
        {post.description ? (
          <p className="text-xl mt-0 text-muted-foreground">
            {post.description}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row sm:gap-4 tracking-wider">
          <p className="m-0">Published on {formatDate(post.date)} </p>
          {post.updatedOn ? <span className="hidden sm:block">•</span> : null}
          {post.updatedOn ? (
            <p className="m-0">Last updated on {formatDate(post.updatedOn)} </p>
          ) : null}
        </div>

        <p className="m-0 mt-3 flex items-center gap-1">
          {" "}
          <Clock className="h-4 w-4" /> {readingTime}
        </p>

        <hr className="my-4" />
        <MDXContent code={post.body} />
      </div>

      <div className="container hidden md:block md:col-span-1 ">
        <OnThisPage htmlContent={post.body} className=" md:top-24" />
      </div>
    </article>
  );
}
