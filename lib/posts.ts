// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { parseISO } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type Post = {
  id: string
  title: string
  date: string
  excerpt: string
  author?: string
  content?: any
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const date = matterResult.data.date
    const parsedDate = typeof date === 'string' ? parseISO(date) : date

    return {
      id,
      date: parsedDate.toISOString(),
      ...(matterResult.data as { title: string; excerpt: string; author?: string }),
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(fileContents)
  
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  })

  return {
    id,
    content: compiledContent,
    ...(data as { title: string; date: string; excerpt: string; author?: string }),
  }
}