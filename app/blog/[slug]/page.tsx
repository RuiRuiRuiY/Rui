import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { MdxContent } from "@/components/mdx-content";
import { cn } from "@/lib/utils";

// 生成静态路径
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "文章未找到 | Rui",
    };
  }
  return {
    title: `${post.title} | Rui`,
    description: post.description,
  };
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await Promise.resolve(params);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* 返回链接 */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            返回博客列表
          </Link>
        </div>

        {/* 文章头部 */}
        <header className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {/* 元信息 */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {/* 日期 */}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            {/* 分隔符 */}
            <span className="text-border">·</span>

            {/* 阅读时间 */}
            <span className="inline-flex items-center">
              <Clock className="mr-1 h-3.5 w-3.5" />
              约 {post.readingTime} 分钟阅读
            </span>
          </div>

          {/* 标签 */}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <MdxContent source={post.content} />
        </div>

        {/* 文章底部导航 */}
        <nav className="mt-16 border-t border-border pt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* 上一篇 */}
            <div className={cn(!prev && "hidden sm:block")}>
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    上一篇
                  </span>
                  <span className="mt-1 flex items-center text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span className="line-clamp-1">{prev.title}</span>
                  </span>
                </Link>
              ) : null}
            </div>

            {/* 下一篇 */}
            <div className={cn(!next && "text-right", "sm:text-right")}>
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col sm:items-end"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    下一篇
                  </span>
                  <span className="mt-1 flex items-center text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                    <span className="line-clamp-1">{next.title}</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </nav>

        {/* 返回博客列表 */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}
