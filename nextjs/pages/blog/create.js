import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GlassCard from '../../components/GlassCard'
import Layout from '../../components/Layout'
import * as blogService from '../../utils/blogService'

export default function BlogCreate() {
  const router = useRouter()
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })

  useEffect(() => {
    // ensure localStorage key exists
    if (typeof window !== 'undefined') {
      blogService.listBlogs()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newBlog.title || !newBlog.content || !newBlog.author) return
    blogService.createBlog(newBlog).then(() => router.push('/blog'))
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <GlassCard title="Write New Blog Post" subtitle="Share your thoughts and updates">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={newBlog.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    name="content"
                    value={newBlog.content}
                    onChange={handleChange}
                    rows={10}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none resize-none"
                    placeholder="Write your blog content here..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg">
                    Publish
                  </button>
                  <button type="button" className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg" onClick={() => router.push('/blog')}>
                    Cancel
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}
