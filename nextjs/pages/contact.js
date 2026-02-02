import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import Layout from '../components/Layout'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const faqs = [
    {
      question: "What file formats does DocuMind support?",
      answer: "Currently, DocuMind supports PDF files. We're working on adding support for other document formats like DOCX, TXT, and more."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes! Your documents are processed locally and never sent to external servers without your explicit permission. We prioritize your privacy and data security."
    },
    {
      question: "How accurate are the answers?",
      answer: "DocuMind uses advanced AI and RAG technology to provide highly accurate answers. The system cites sources and provides confidence indicators for transparency."
    },
    {
      question: "Can I ask follow-up questions?",
      answer: "Absolutely! DocuMind supports multi-turn conversations, so you can ask follow-up questions to dive deeper into your documents."
    },
    {
      question: "Is there a file size limit?",
      answer: "For the current demo, we recommend files under 50MB. Larger files may take longer to process. We're continuously optimizing performance."
    }
  ]

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            <GlassCard title="Contact Us" subtitle="Get in touch with our team">
              <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Have questions about DocuMind? Need help with implementation?
                Want to suggest new features? We'd love to hear from you!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-xl">📧</span>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-400">hello@documind.ai</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-blue-400 text-xl">🐙</span>
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-gray-400">github.com/documind</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">💬</span>
                  <div>
                    <div className="font-semibold">Community</div>
                    <div className="text-gray-400">Join our Discord server</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-yellow-400 focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-300 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
              </div>
            </GlassCard>

            <GlassCard title="Frequently Asked Questions" subtitle="Quick answers to common questions">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-6">
                <h4 className="font-semibold text-yellow-400 mb-2">{faq.question}</h4>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Support & Resources" subtitle="Additional help and documentation">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold mb-2">Documentation</h4>
              <p className="text-sm text-gray-300 mb-3">
                Comprehensive guides and API documentation for developers.
              </p>
              <button className="px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-300 transition-colors">
                View Docs
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h4 className="font-semibold mb-2">Video Tutorials</h4>
              <p className="text-sm text-gray-300 mb-3">
                Step-by-step video guides to help you get started quickly.
              </p>
              <button className="px-4 py-2 bg-blue-400 text-white rounded font-semibold hover:bg-blue-300 transition-colors">
                Watch Videos
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2">Community Forum</h4>
              <p className="text-sm text-gray-300 mb-3">
                Connect with other users and share tips and tricks.
              </p>
              <button className="px-4 py-2 bg-green-400 text-white rounded font-semibold hover:bg-green-300 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}