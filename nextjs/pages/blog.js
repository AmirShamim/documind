import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Welcome to DocuMind Blog',
      content: 'This is our first blog post introducing the DocuMind platform and its capabilities for intelligent document analysis.',
      author: 'DocuMind Team',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'How AI is Revolutionizing Document Analysis',
      content: 'Explore how artificial intelligence and machine learning are transforming the way we interact with documents, making information retrieval faster and more accurate.',
      author: 'AI Research Team',
      date: '2024-01-20'
    }
  ])

  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBlog(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newBlog.title && newBlog.content && newBlog.author) {
      const blog = {
        id: Date.now(),
        ...newBlog,
        date: new Date().toISOString().split('T')[0]
      }
      setBlogs(prev => [blog, ...prev])
      setNewBlog({ title: '', content: '', author: '' })
    }
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            <GlassCard title="DocuMind Blog" subtitle="Latest updates, insights, and news from the DocuMind team">
              <p className="text-gray-300 mb-6">
                Stay updated with the latest developments in AI-powered document analysis, tutorials, and industry insights.
              </p>
            </GlassCard>

            {/* Add New Blog Form */}
            <GlassCard title="Write New Blog Post" subtitle="Share your thoughts and updates">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none resize-none"
                    placeholder="Write your blog content here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-300 transition-all"
                >
                  Publish Blog Post
                </button>
              </form>
            </GlassCard>

            {/* Blog Posts */}
            <div className="space-y-8">
              {blogs.map((blog) => (
                <GlassCard
                  key={blog.id}
                  title={blog.title}
                  subtitle={`By ${blog.author} on ${blog.date}`}
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{blog.content}</p>
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