import { Post as PostType } from "@/.velite";
import Post from "./Post";

type PostListProps = {
  posts: PostType[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="space-y-10">
      {posts.map(
        (post) =>
          post.published && (
            <li key={post.slug}>
              <Post
                key={post.slug}
                title={post.title}
                description={post.description || ""}
                date={post.date}
                tags={post.tags}
                summary={post.summary || ""}
                slug={post.slug}
                readingTime={post.readingTime}
              />
            </li>
          )
      )}
    </ul>
  );
};

export default PostList;
