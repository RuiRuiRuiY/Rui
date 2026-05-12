import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PostCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  className?: string;
}

export function PostCard({
  title,
  description,
  date,
  tags,
  slug,
  className,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm transition-all hover:border-brand/50 hover:shadow-md",
        className
      )}
    >
      {/* Title */}
      <h3 className="text-lg font-semibold leading-tight group-hover:text-brand transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {description}
      </p>

      {/* Meta info */}
      <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
        {/* Date */}
        <time dateTime={date}>{date}</time>

        {/* Divider */}
        <span className="text-border">·</span>

        {/* Tags */}
        <div className="flex items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
