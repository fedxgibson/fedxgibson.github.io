// app/blog/[id]/page.tsx
import { getPostData, getSortedPostsData } from '@/lib/posts'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Post({ params }: { params: Promise<any> }) {
  let post;
	const { id } = await params
  try {
    post = await getPostData(id)
  } catch (error) {
    console.log(error);
    
    notFound()
  }

  return (
    <main className="py-8">
      <article className="max-w-2xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 block">
          ← Back to home
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <time className="text-gray-600 block" dateTime={post.date}>
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </time>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>

        {post.author && (
          <footer className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">Written by {post.author}</p>
          </footer>
        )}
      </article>
    </main>
  )
}