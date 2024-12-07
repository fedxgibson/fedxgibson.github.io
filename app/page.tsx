// app/page.tsx
import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export default function Home() {
  const posts = getSortedPostsData()

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              <Link href={`/blog/${post.id}`} className="block group">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <time className="text-gray-600" dateTime={post.date}>
                  {format(parseISO(post.date), 'MMMM d, yyyy')}
                </time>
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}