import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function Features() {
  const features = [
    {
      icon: '📄',
      title: 'PDF Processing',
      description: 'Upload any PDF document and instantly make it conversational. Our advanced text extraction handles complex layouts, tables, and images.',
      benefits: ['Multi-format support', 'Fast processing', 'Preserves document structure']
    },
    {
      icon: '💬',
      title: 'Natural Conversations',
      description: 'Ask questions in plain English and get contextual answers. No more keyword searching or manual scanning through pages.',
      benefits: ['Natural language queries', 'Context-aware responses', 'Follow-up questions']
    },
    {
      icon: '🎯',
      title: 'Precise Answers',
      description: 'Powered by RAG technology, DocuMind finds the exact information you need from your documents with high accuracy.',
      benefits: ['Semantic search', 'Source citations', 'Confidence scoring']
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get answers in seconds, not minutes. Our optimized vector search and AI models deliver rapid responses.',
      benefits: ['Sub-second queries', 'Batch processing', 'Offline capability']
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your documents stay on your device. No data is sent to external servers unless you explicitly choose cloud processing.',
      benefits: ['Local processing', 'No data retention', 'GDPR compliant']
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Access DocuMind from any device with a web browser. Works on desktop, tablet, and mobile devices.',
      benefits: ['Responsive design', 'PWA support', 'Offline mode']
    }
  ]

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            <GlassCard title="Powerful Features" subtitle="Everything you need for intelligent document interaction">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-6 hover:border-yellow-400 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <GlassCard title="Use Cases" subtitle="Perfect for various scenarios">
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-yellow-400">Academic Research</h4>
                <p className="text-sm text-gray-300">Quickly analyze research papers, theses, and academic documents for literature reviews.</p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-blue-400">Legal Documents</h4>
                <p className="text-sm text-gray-300">Review contracts, case law, and legal briefs with precision and speed.</p>
              </div>

              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-green-400">Business Reports</h4>
                <p className="text-sm text-gray-300">Extract insights from financial reports, market analysis, and business documents.</p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="font-semibold text-purple-400">Technical Documentation</h4>
                <p className="text-sm text-gray-300">Navigate complex manuals, API docs, and technical specifications effortlessly.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Why Choose DocuMind?" subtitle="The advantages that matter">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">🚀 Productivity Boost</h4>
                <p className="text-sm text-gray-300">Save hours of manual document review. Get answers 10x faster than traditional methods.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">🎯 Higher Accuracy</h4>
                <p className="text-sm text-gray-300">AI-powered search finds relevant information that keyword searches might miss.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">💰 Cost Effective</h4>
                <p className="text-sm text-gray-300">Reduce time spent on document analysis, allowing focus on high-value tasks.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">🔧 Easy Integration</h4>
                <p className="text-sm text-gray-300">Simple upload-and-ask interface. No complex setup or training required.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
    </Layout>
  )
}