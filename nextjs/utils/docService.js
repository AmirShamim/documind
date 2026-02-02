const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_KEY = process.env.NEXT_PUBLIC_AI_KEY || ''
const UPLOAD_KEY = 'documind_doc_id'

function buildHeaders(extra = {}) {
  const headers = { ...extra }
  if (API_KEY) {
    headers.Authorization = `Bearer ${API_KEY}`
    headers['x-api-key'] = API_KEY
  }
  return headers
}

async function uploadPdf(file) {
  const fd = new FormData()
  fd.append('file', file)

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: fd,
    headers: buildHeaders(),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'upload failed')
  }
  return res.json()
}

async function queryDoc(doc_id, question) {
  const fd = new FormData()
  fd.append('doc_id', doc_id)
  fd.append('question', question)

  const res = await fetch(`${API_BASE}/query`, {
    method: 'POST',
    body: fd,
    headers: buildHeaders(),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'query failed')
  }
  return res.json()
}

function getStoredDocId() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(UPLOAD_KEY)
}

function setStoredDocId(id) {
  if (typeof window === 'undefined') return
  localStorage.setItem(UPLOAD_KEY, id)
}

async function getInsights(doc_id) {
  const res = await fetch(`${API_BASE}/insights/${doc_id}`, {
    headers: buildHeaders(),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'failed to load insights')
  }
  return res.json()
}

export default {
  uploadPdf,
  queryDoc,
  getStoredDocId,
  setStoredDocId,
  getInsights,
}
