export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">DocuMind</h3>
            <p className="text-gray-400 text-sm">
              AI-powered document assistant for faster, smarter research and learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/features" className="hover:text-yellow-400 transition-colors">Features</a></li>
              <li><a href="/how-it-works" className="hover:text-yellow-400 transition-colors">How It Works</a></li>
              <li><a href="/demo" className="hover:text-yellow-400 transition-colors">Demo</a></li>
              <li><a href="/docs" className="hover:text-yellow-400 transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 DocuMind. Built with ❤️ for the research community.</p>
        </div>
      </div>
    </footer>
  )
}