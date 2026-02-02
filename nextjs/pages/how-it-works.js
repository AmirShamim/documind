import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Upload Your Document",
      description: "Simply drag and drop or select any PDF file. Our system accepts various document formats and sizes.",
      icon: "📤",
      details: ["Secure file upload", "Multiple format support", "Instant processing start"]
    },
    {
      step: 2,
      title: "AI Processing",
      description: "DocuMind extracts text, understands structure, and creates intelligent embeddings for semantic search.",
      icon: "🧠",
      details: ["Text extraction", "Document parsing", "Vector embeddings creation"]
    },
    {
      step: 3,
      title: "Smart Indexing",
      description: "Your document is indexed using advanced vector search technology, making every piece of content searchable by meaning.",
      icon: "🔍",
      details: ["FAISS vector indexing", "Semantic understanding", "Fast retrieval setup"]
    },
    {
      step: 4,
      title: "Ask Questions",
      description: "Pose questions in natural language. No need for exact keywords - our AI understands context and intent.",
      icon: "💬",
      details: ["Natural language queries", "Context awareness", "Multi-turn conversations"]
    },
    {
      step: 5,
      title: "Get Precise Answers",
      description: "Receive accurate, contextual answers with source citations. Follow up with related questions for deeper insights.",
      icon: "✨",
      details: ["Contextual responses", "Source citations", "Confidence indicators"]
    }
  ]

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            <GlassCard title="How DocuMind Works" subtitle="From upload to insight in 5 simple steps">
              <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.step} className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-yellow-400">{step.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-4">{step.description}</p>

                  <div className="grid md:grid-cols-3 gap-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="bg-gray-800 rounded px-3 py-2 text-sm text-center">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard title="Technical Architecture" subtitle="The AI pipeline behind DocuMind">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-400">Frontend Layer</h4>
                <p className="text-sm text-gray-300 mb-2">Next.js + React + Tailwind CSS</p>
                <p className="text-xs text-gray-400">Responsive UI, file upload, real-time interactions</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-green-400">Processing Layer</h4>
                <p className="text-sm text-gray-300 mb-2">Python + FastAPI + RAG Pipeline</p>
                <p className="text-xs text-gray-400">Document processing, embeddings, vector search</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-purple-400">AI Layer</h4>
                <p className="text-sm text-gray-300 mb-2">OpenAI GPT + Sentence Transformers</p>
                <p className="text-xs text-gray-400">Natural language understanding, answer generation</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-orange-400">Storage Layer</h4>
                <p className="text-sm text-gray-300 mb-2">FAISS + In-memory Vectors</p>
                <p className="text-xs text-gray-400">High-performance similarity search</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Key Technologies" subtitle="The tools that make it possible">
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-yellow-400">Retrieval-Augmented Generation (RAG)</h4>
                <p className="text-sm text-gray-300">Combines document retrieval with AI generation for accurate, contextual answers based on your specific documents.</p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-blue-400">Vector Embeddings</h4>
                <p className="text-sm text-gray-300">Transforms text into mathematical vectors that capture semantic meaning, enabling intelligent similarity search.</p>
              </div>

              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-green-400">FAISS Vector Database</h4>
                <p className="text-sm text-gray-300">Facebook's high-performance library for efficient similarity search and clustering of dense vectors.</p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="font-semibold text-purple-400">Sentence Transformers</h4>
                <p className="text-sm text-gray-300">State-of-the-art embeddings for sentences and paragraphs, optimized for semantic search tasks.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard title="Performance & Security" subtitle="Built for speed and privacy">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">Fast Processing</h4>
              <p className="text-sm text-gray-300">Documents processed in seconds, queries answered in milliseconds</p>
            </div>

            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold mb-2">Privacy First</h4>
              <p className="text-sm text-gray-300">Your documents never leave your device without explicit permission</p>
            </div>

            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">High Accuracy</h4>
              <p className="text-sm text-gray-300">Advanced AI ensures precise answers with source verification</p>
            </div>
          </div>
        </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}