"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/post-card";
import type { Post, TagInfo } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface BlogPageClientProps {
  posts: Post[];
  tags: TagInfo[];
}

export function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 根据选中的标签筛选文章（OR 逻辑）
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts;
    }
    return posts.filter((post) =>
      post.tags.some((tag) => selectedTags.includes(tag))
    );
  }, [posts, selectedTags]);

  // 切换标签选中状态
  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            博客
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            探索 AI 技术的深度文章，从基础认知到实用技巧
          </p>
        </div>

        {/* 标签筛选器 */}
        {tags.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                按标签筛选
              </h2>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand hover:text-brand/80 transition-colors"
                >
                  清除筛选
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => toggleTag(tag.name)}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                    selectedTags.includes(tag.name)
                      ? "bg-brand text-brand-foreground hover:bg-brand/90"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {tag.name}
                  <span
                    className={cn(
                      "ml-1.5 text-xs",
                      selectedTags.includes(tag.name)
                        ? "text-brand-foreground/80"
                        : "text-muted-foreground/60"
                    )}
                  >
                    ({tag.count})
                  </span>
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                已选择 {selectedTags.length} 个标签，显示 {filteredPosts.length} 篇文章
              </p>
            )}
          </div>
        )}

        {/* 文章网格 */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </div>
        ) : (
          /* 空状态 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">暂无文章</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedTags.length > 0
                ? "当前筛选条件下没有找到文章，请尝试其他标签"
                : "博客文章正在准备中，敬请期待"}
            </p>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
              >
                查看所有文章
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
