import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function Demo() {
  const [selectedExample, setSelectedExample] = useState(null)

  const examples = [
    {
      id: 'research',
      title: 'Research Paper Analysis',
      document: 'AI Ethics Research Paper',
      questions: [
        {
          q: "What are the main ethical concerns discussed in this paper?",
          a: "The paper discusses algorithmic bias, privacy implications, autonomous weapon systems, and the need for ethical AI development frameworks."
        },
        {
          q: "What solutions does the author propose for AI bias?",
          a: "The author proposes diverse training data, regular bias audits, transparency in AI decision-making, and inclusive development teams."
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal Document Review',
      document: 'Service Agreement Contract',
      questions: [
        {
          q: "What is the termination clause in section 8?",
          a: "Section 8 allows termination with 30 days written notice, or immediately for material breach of terms."
        },
        {
          q: "What are the liability limitations mentioned?",
          a: "Liability is limited to the amount paid for services in the preceding 12 months, excluding data loss claims."
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Report Analysis',
      document: 'Q4 Financial Report',
      questions: [
        {
          q: "What was the revenue growth percentage this quarter?",
          a: "Revenue grew by 23.5% compared to Q4 last year, reaching $12.4 million."
        },
        {
          q: "What are the main factors contributing to profit increase?",
          a: "Cost optimization (15%), new client acquisition (12%), and efficiency improvements (8%) were the main contributors."
        }
      ]
    }
  ]

  const handleExampleClick = (exampleId) => {
    setSelectedExample(exampleId)
  }

  const selectedExampleData = examples.find(ex => ex.id === selectedExample)

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 px-6">
          <GlassCard title="Interactive Demo" subtitle="See DocuMind in action with real examples">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 mb-4">
              Choose a document type below to see how DocuMind answers questions about different kinds of content.
            </p>
            <p className="text-sm text-gray-400">
              These examples show typical interactions - try uploading your own documents on the home page!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {examples.map((example) => (
              <div
                key={example.id}
                onClick={() => handleExampleClick(example.id)}
                className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                  selectedExample === example.id
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-600 hover:border-yellow-400/50'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 text-yellow-400">{example.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{example.document}</p>
                <div className="text-xs text-gray-400">
                  {example.questions.length} sample questions
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {selectedExampleData && (
          <GlassCard title={`Demo: ${selectedExampleData.title}`} subtitle={selectedExampleData.document}>
            <div className="space-y-6">
              {selectedExampleData.questions.map((qa, index) => (
                <div key={index} className="border-l-4 border-yellow-400 pl-6">
                  <div className="mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 font-semibold mt-1">Q:</span>
                      <p className="text-gray-200 font-medium">{qa.q}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-semibold mt-1">A:</span>
                      <p className="text-gray-300">{qa.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">💡</span>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Try it yourself!</h4>
                  <p className="text-sm text-gray-300">
                    Upload a similar document on the home page and ask your own questions.
                    DocuMind will analyze your specific content and provide personalized answers.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        <GlassCard title="Sample Documents" subtitle="Download and try these examples">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-600 rounded-lg p-6">
              <h4 className="font-semibold mb-3 text-yellow-400">Academic Paper</h4>
              <p className="text-sm text-gray-300 mb-4">
                A research paper on artificial intelligence ethics and governance.
                Perfect for testing academic document analysis.
              </p>
              <button className="px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-300 transition-colors">
                Download Sample PDF
              </button>
            </div>

            <div className="border border-gray-600 rounded-lg p-6">
              <h4 className="font-semibold mb-3 text-blue-400">Business Report</h4>
              <p className="text-sm text-gray-300 mb-4">
                A quarterly financial report with charts, tables, and detailed analysis.
                Great for business document testing.
              </p>
              <button className="px-4 py-2 bg-blue-400 text-white rounded font-semibold hover:bg-blue-300 transition-colors">
                Download Sample PDF
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Getting Started" subtitle="Ready to try DocuMind?">
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-6">
              Experience the power of conversational document analysis. Upload any PDF and start asking questions immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-300 transition-all"
              >
                Try DocuMind Now
              </a>
              <a
                href="/features"
                className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  )
}