import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 px-6">
          <GlassCard title="About DocuMind" subtitle="Revolutionizing Document Interaction">
            <div className="space-y-6">
              <p className="text-lg">
                DocuMind is an AI-powered document assistant that transforms how students, professionals, and researchers interact with PDF documents.
                Instead of spending hours reading through lengthy documents, users can now have natural conversations with their files.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">Our Mission</h3>
                  <p>
                    To democratize access to information by making document analysis fast, intuitive, and conversational.
                    We believe that knowledge should be accessible through dialogue, not exhaustive reading.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">Our Vision</h3>
                  <p>
                    A world where anyone can extract insights from complex documents in seconds,
                    where AI becomes a collaborative partner in learning and research.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Technology Stack" subtitle="Built with Modern AI and Web Technologies">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-semibold mb-2">RAG Architecture</h4>
                <p className="text-sm text-gray-300">
                  Retrieval-Augmented Generation combines document search with AI generation for accurate, contextual answers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">Vector Embeddings</h4>
                <p className="text-sm text-gray-300">
                  FAISS-powered semantic search finds relevant content by meaning, not just keywords.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h4 className="font-semibold mb-2">Modern Web Stack</h4>
                <p className="text-sm text-gray-300">
                  Next.js, React, and Tailwind CSS deliver a fast, responsive user experience.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="The Team" subtitle="Passionate AI and Education Enthusiasts">
            <div className="text-center">
              <p className="text-lg mb-6">
                DocuMind was built by a team of developers and educators who saw the need for better document interaction tools.
                We're committed to making AI accessible and beneficial for learning and research.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <h4 className="font-semibold">AI Engineers</h4>
                  <p className="text-sm text-gray-300">Building the RAG pipeline and ML models</p>
                </div>

                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-semibold">UX Designers</h4>
                  <p className="text-sm text-gray-300">Creating intuitive user experiences</p>
                </div>

                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h4 className="font-semibold">Educators</h4>
                  <p className="text-sm text-gray-300">Ensuring educational value and accuracy</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  )
}