import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GlassCard from '../../components/GlassCard'
import Layout from '../../components/Layout'
import * as blogService from '../../utils/blogService'

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!id) return
    if (typeof window === 'undefined') return
    try {
      blogService.getBlog(id).then((found) => setPost(found || null))
    } catch (e) {
      setPost(null)
    }
  }, [id])

  if (!post) {
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
          <GlassCard title={post.title} subtitle={`By ${post.author} on ${post.date}`}>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  )
}
