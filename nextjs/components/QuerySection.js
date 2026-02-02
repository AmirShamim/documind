import { useState } from 'react';
import docService from '../utils/docService';

export default function QuerySection({ docId, setAnswer, setError }) {
  const [question, setQuestion] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  async function handleQuery(e) {
    e.preventDefault();
    if (!question || !docId) return;
    setLoadingAnswer(true);
    setError(null);
    try {
      const res = await docService.queryDoc(docId, question);
      setAnswer(res);
    } catch (err) {
      setError('Error contacting backend. Please try again.');
    } finally {
      setLoadingAnswer(false);
    }
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Ask Your Questions
        </h2>
        <p className="text-gray-400 text-lg">Get instant answers from your document</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-8 backdrop-blur-sm">
          <form onSubmit={handleQuery} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Your Question
              </label>
              <textarea
                placeholder="What would you like to know about your document?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className="w-full px-4 py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loadingAnswer || !docId || !question.trim()}
                className="flex-1 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-400 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                {loadingAnswer ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing Document...
                  </div>
                ) : (
                  'Get Answer'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAnswer(null);
                  setQuestion('');
                }}
                className="px-8 py-4 rounded-lg border border-[rgba(255,255,255,0.08)] text-gray-300 hover:text-white hover:border-gray-400 transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </form>

          {!docId && (
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">Upload a document first</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">You need to upload a PDF before asking questions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}