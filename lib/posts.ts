import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface Post {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  content: string;
  readingTime: number;
}

export interface TagInfo {
  name: string;
  count: number;
}

export interface AdjacentPosts {
  prev: Post | null;
  next: Post | null;
}

/**
 * 计算阅读时间（分钟）
 * 中文按字符数 ÷ 400，英文按单词数 ÷ 200
 */
export function calculateReadingTime(content: string): number {
  // 移除 Markdown 标记和代码块
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // 移除代码块
    .replace(/`[^`]*`/g, "") // 移除行内代码
    .replace(/[#*_\[\]()\-|>]/g, ""); // 移除 Markdown 标记

  // 统计中文字符
  const chineseChars = (plainText.match(/[一-龥]/g) || []).length;

  // 统计英文单词（按空格分割的非空字符串）
  const englishWords = plainText
    .replace(/[一-龥]/g, " ") // 中文字符替换为空格
    .split(/\s+/)
    .filter((word) => word.length > 0 && /^[a-zA-Z]+$/.test(word)).length;

  // 计算阅读时间（向上取整）
  const chineseMinutes = Math.ceil(chineseChars / 400);
  const englishMinutes = Math.ceil(englishWords / 200);

  // 至少 1 分钟
  return Math.max(1, chineseMinutes + englishMinutes);
}

/**
 * 获取所有文章
 * 按日期降序排列（最新的在前）
 */
export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title || "",
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
        tags: data.tags || [],
        slug: data.slug || slug,
        content,
        readingTime: calculateReadingTime(content),
      };
    });

  // 按日期降序排列
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * 根据 slug 获取单篇文章
 */
export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * 获取所有标签及其文章数量
 */
export function getAllTags(): TagInfo[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // 按数量降序
}

/**
 * 获取相邻文章（上一篇/下一篇）
 * prev: 更新的文章（上一篇）
 * next: 更旧的文章（下一篇）
 */
export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
