"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";
import { transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight } from "@shikijs/transformers";
import { Copy, Check } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// 客户端代码块组件 - 支持主题切换
function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const { resolvedTheme, theme } = useTheme();
  const [lightHtml, setLightHtml] = useState<string>("");
  const [darkHtml, setDarkHtml] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const displayLanguage = language === "text" ? "" : language;

  // 避免 hydration 不匹配，等待组件挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  // 分别生成浅色和深色主题的高亮代码
  useEffect(() => {
    async function highlight() {
      // 自定义 transformer：移除内联背景色，让 CSS 变量生效
      const removeBgTransformer = {
        name: "remove-bg",
        pre(node: any) {
          if (node.properties?.style) {
            // 移除 background-color 相关样式
            node.properties.style = node.properties.style
              .replace(/background-color:[^;]+;?/gi, "")
              .replace(/background:[^;]+;?/gi, "")
              .trim();
            if (!node.properties.style) {
              delete node.properties.style;
            }
          }
        },
      };

      const [light, dark] = await Promise.all([
        codeToHtml(code, {
          lang: language as any,
          theme: "github-light",
          transformers: [removeBgTransformer],
        }),
        codeToHtml(code, {
          lang: language as any,
          theme: "github-dark-dimmed",
          transformers: [removeBgTransformer],
        }),
      ]);
      setLightHtml(light);
      setDarkHtml(dark);
    }
    highlight();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 使用 theme 作为 fallback，避免 resolvedTheme 初始为 undefined
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  // 挂载前显示普通代码，避免主题闪烁
  if (!mounted || (!lightHtml && !darkHtml)) {
    return (
      <div className="my-6 overflow-hidden rounded-lg border border-[var(--code-border)] bg-[var(--code-bg)]">
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {displayLanguage && (
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {displayLanguage}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>复制</span>
          </button>
        </div>
        <div className="overflow-x-auto p-4 bg-[var(--code-bg)]">
          <pre className="m-0 bg-transparent text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[var(--code-border)] bg-[var(--code-bg)]">
      {/* 代码块头部 */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 dark:bg-muted/10 px-4 py-2">
        <div className="flex items-center gap-2">
          {displayLanguage && (
            <span className="text-xs font-medium text-muted-foreground uppercase">
              {displayLanguage}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* 代码内容 - 根据主题显示对应的代码 */}
      <div className="overflow-x-auto">
        {lightHtml && darkHtml ? (
          <>
            {/* 浅色主题代码 */}
            <div
              className={cn(
                "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed",
                isDark && "hidden"
              )}
              dangerouslySetInnerHTML={{ __html: lightHtml }}
            />
            {/* 深色主题代码 */}
            <div
              className={cn(
                "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed",
                !isDark && "hidden"
              )}
              dangerouslySetInnerHTML={{ __html: darkHtml }}
            />
          </>
        ) : (
          <pre className="m-0 bg-transparent p-4 text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

// 行内代码组件
function InlineCode({ children, ...props }: any) {
  return (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground",
        "border border-border/60",
        "dark:bg-muted/70 dark:border-border/40"
      )}
      {...props}
    >
      {children}
    </code>
  );
}

// 普通代码块（无语言标识）
function PlainCodeBlock({ children }: any) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
      {children}
    </pre>
  );
}

// MDX 组件映射
const components = {
  pre: ({ children }: any) => {
    if (children?.props?.className?.includes("language-")) {
      const language = children.props.className.replace("language-", "");
      return <CodeBlock code={children.props.children} language={language} />;
    }
    return <PlainCodeBlock>{children}</PlainCodeBlock>;
  },
  code: ({ children, className }: any) => {
    if (className?.includes("language-")) {
      return <code>{children}</code>;
    }
    return <InlineCode>{children}</InlineCode>;
  },
  h1: ({ children }: any) => (
    <h1 className="mt-10 mb-6 text-3xl font-semibold tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="mb-4 text-base leading-7 text-foreground">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground">{children}</ol>
  ),
  li: ({ children }: any) => <li className="text-base leading-7">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="my-6 border-l-4 border-brand bg-muted/50 py-4 pl-4 pr-4 italic text-foreground">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-brand underline underline-offset-4 transition-colors hover:text-brand/80"
    >
      {children}
    </a>
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="border-b border-border bg-muted">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="transition-colors hover:bg-muted/50">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-3 text-foreground">{children}</td>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: any) => <em className="italic">{children}</em>,
};

interface MdxContentProps {
  source: string;
  className?: string;
}

// 客户端 MDX 渲染组件
export function MdxContent({ source, className }: MdxContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    async function loadMdx() {
      const serialized = await serialize(source, {
        mdxOptions: {
          development: process.env.NODE_ENV === "development",
        },
      });
      setMdxSource(serialized);
    }
    loadMdx();
  }, [source]);

  if (!mdxSource) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-full mb-4"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none dark:prose-invert",
        "prose-code:before:content-none prose-code:after:content-none",
        className
      )}
    >
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}
