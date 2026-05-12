import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4">
      <div className="mb-6 rounded-full bg-muted p-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        文章不存在
      </h1>
      <p className="mb-6 max-w-md text-center text-muted-foreground">
        抱歉，你访问的文章可能已被删除或链接有误。
      </p>
      <div className="flex gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回博客列表
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
