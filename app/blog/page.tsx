import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogPageClient } from "./blog-page-client";

export const metadata = {
  title: "博客 | Rui",
  description: "探索 AI 技术的深度文章，从基础认知到实用技巧",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogPageClient posts={posts} tags={tags} />;
}
