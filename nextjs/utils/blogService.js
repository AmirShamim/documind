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

const STORAGE_KEY = 'documind_blogs'

function readStorage() {
  if (typeof window === 'undefined') return SAMPLE_BLOGS.slice()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SAMPLE_BLOGS.slice()
    return JSON.parse(raw)
  } catch (e) {
    console.warn('blogService: failed to read storage', e)
    return SAMPLE_BLOGS.slice()
  }
}

function writeStorage(arr) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
  } catch (e) {
    console.warn('blogService: failed to write storage', e)
  }
}

export async function listBlogs() {
  // async wrapper so we can swap to network calls later
  return Promise.resolve(readStorage())
}

export async function getBlog(id) {
  const arr = readStorage()
  const found = arr.find((b) => String(b.id) === String(id))
  return Promise.resolve(found || null)
}

export async function createBlog(blog) {
  const arr = readStorage()
  const next = [{ id: Date.now(), ...blog, date: new Date().toISOString().split('T')[0] }, ...arr]
  writeStorage(next)
  return Promise.resolve(next[0])
}

export async function updateBlog(id, updates) {
  const arr = readStorage()
  const next = arr.map((b) => (String(b.id) === String(id) ? { ...b, ...updates } : b))
  writeStorage(next)
  return Promise.resolve(next.find((b) => String(b.id) === String(id)) || null)
}

export async function deleteBlog(id) {
  const arr = readStorage()
  const next = arr.filter((b) => String(b.id) !== String(id))
  writeStorage(next)
  return Promise.resolve(true)
}

export default {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
}
