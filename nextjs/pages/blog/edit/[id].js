import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GlassCard from '../../../components/GlassCard'
import Layout from '../../../components/Layout'
import * as blogService from '../../../utils/blogService'

export default function BlogEdit() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)
  const [form, setForm] = useState({ title: '', author: '', content: '' })

  useEffect(() => {
    if (!id) return
    if (typeof window === 'undefined') return
    try {
      blogService.getBlog(id).then((found) => {
        if (found) {
          setPost(found)
          setForm({ title: found.title || '', author: found.author || '', content: found.content || '' })
        } else {
          setPost(null)
        }
      })
    } catch (e) {
      setPost(null)
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!post) return
    blogService.updateBlog(post.id, form).then(() => router.push(`/blog/${post.id}`))
  }

  const handleDelete = () => {
    if (!confirm('Delete this blog post?')) return
    blogService.deleteBlog(post.id).then(() => router.push('/blog'))
  }

  if (post === null) {
    return (
      <Layout>
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard title="Not Found" subtitle="Blog post not available">
              <p className="text-gray-300">We couldn't find the requested blog post.</p>
            </GlassCard>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <GlassCard title={`Edit: ${post.title}`} subtitle={`By ${post.author} on ${post.date}`}>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input name="author" value={form.author} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea name="content" rows={10} value={form.content} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white resize-none" />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg">Save</button>
                  <button type="button" onClick={() => router.push(`/blog/${post.id}`)} className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg">Cancel</button>
                  <button type="button" onClick={handleDelete} className="px-6 py-3 text-red-400">Delete</button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}
