import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { ArrowRight } from "lucide-react";

// 假数据 - 最新文章
const latestPosts = [
  {
    title: "什么是大模型？一张图讲清楚",
    description:
      "用非技术语言解释 ChatGPT 背后的技术原理，让每个人都能理解大模型是如何工作的。",
    date: "2026-05-09",
    tags: ["基础认知"],
    slug: "what-is-llm",
  },
  {
    title: "如何与AI有效对话",
    description:
      "Prompt 基础技巧：从提问方式到上下文管理，掌握与 AI 高效沟通的核心方法。",
    date: "2026-05-08",
    tags: ["Prompt基础"],
    slug: "how-to-talk-to-ai",
  },
  {
    title: "为什么现在的AI和以前不一样？",
    description:
      "从规则引擎到大语言模型，AI 技术经历了怎样的演进？这次真的不一样了。",
    date: "2026-05-07",
    tags: ["原理解析"],
    slug: "why-ai-is-different",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Main Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              学好AI，用好AI
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              用程序员的深度，做你的AI向导
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="#latest-posts"
                className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
              >
                浏览文章
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section
        id="latest-posts"
        className="border-t border-border bg-muted/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              最新文章
            </h2>
            <Link
              href="/blog"
              className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              查看更多
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
