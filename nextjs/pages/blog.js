import { useEffect, useState } from 'react'
import Link from 'next/link'
import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'
import * as blogService from '../utils/blogService'

const SAMPLE_BLOGS = [
  {
    id: 1,
    title: 'Welcome to DocuMind Blog',
    content:
      'This is our first blog post introducing the DocuMind platform and its capabilities for intelligent document analysis.',
    author: 'DocuMind Team',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'How AI is Revolutionizing Document Analysis',
    content:
      'Explore how artificial intelligence and machine learning are transforming the way we interact with documents, making information retrieval faster and more accurate.',
    author: 'AI Research Team',
    date: '2024-01-20'
  }
]

function loadBlogs() {
  if (typeof window === 'undefined') return SAMPLE_BLOGS
  try {
    const raw = localStorage.getItem('documind_blogs')
    if (!raw) return SAMPLE_BLOGS
    return JSON.parse(raw)
  } catch (e) {
    return SAMPLE_BLOGS
  }
}

export default function Blog() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.listBlogs().then((b) => setBlogs(b || []))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return
    await blogService.deleteBlog(id)
    const next = await blogService.listBlogs()
    setBlogs(next || [])
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            <GlassCard title="DocuMind Blog" subtitle="Latest updates, insights, and news from the DocuMind team">
              <p className="text-gray-300 mb-6">Stay updated with the latest developments in AI-powered document analysis, tutorials, and industry insights.</p>
              <div className="text-right">
                <Link href="/blog/create" className="text-sm font-semibold text-yellow-400 hover:underline">
                  Write a post
                </Link>
              </div>
            </GlassCard>

            <div className="space-y-6">
              {blogs.map((blog) => (
                <GlassCard key={blog.id} title={blog.title} subtitle={`By ${blog.author} on ${blog.date}`}>
                  <div className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">{blog.content.slice(0, 300)}{blog.content.length > 300 ? '...' : ''}</div>
                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${blog.id}`} className="text-yellow-400 font-semibold">Read more →</Link>
                    <div className="flex items-center gap-3">
                      <Link href={`/blog/edit/${blog.id}`} className="text-sm text-gray-300 hover:text-yellow-400">Edit</Link>
                      <button onClick={() => handleDelete(blog.id)} className="text-sm text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}