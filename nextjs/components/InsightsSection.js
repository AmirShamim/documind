import { useState, useEffect } from 'react';
import docService from '../utils/docService';

const POLL_INTERVAL = 2500;

export default function InsightsSection({ docId }) {
  const [status, setStatus] = useState('idle');
  const [insights, setInsights] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;

    async function pollInsights() {
      if (!docId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await docService.getInsights(docId);
        if (data.status === 'ready') {
          setInsights(data.insights);
          setMetadata(data.metadata);
          setStatus('ready');
        } else {
          setStatus('processing');
          timer = setTimeout(pollInsights, POLL_INTERVAL);
        }
      } catch (err) {
        setStatus('error');
        setError('Failed to load insights from the backend.');
      } finally {
        setLoading(false);
      }
    }

    if (docId) {
      pollInsights();
    } else {
      setStatus('idle');
      setInsights(null);
      setMetadata(null);
    }

    return () => timer && clearTimeout(timer);
  }, [docId]);

  if (!docId) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Document Insights
          </h2>
          <p className="text-gray-400 text-lg">Upload a document to unlock AI-extracted insights.</p>
        </div>
        <div className="max-w-xl mx-auto text-center text-gray-500">
          <p>Once processing finishes you will see a summary, action items, and document statistics.</p>
        </div>
      </div>
    );
  }

  if (status === 'processing' || loading) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Analyzing Document...
          </h2>
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-400 mt-4">This can take a few seconds depending on document size.</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Insights Unavailable
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  // Safely access nested properties
  const keyTopics = insights.key_topics || [];
  const actionItems = insights.action_items || [];
  const entities = insights.entities || { people: [], organizations: [], dates: [], locations: [] };
  const documentStats = insights.document_stats || {};

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Document Insights
        </h2>
        <p className="text-gray-400 text-lg">AI-extracted summary, topics, and action items from your upload.</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-lg">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-400">Summary</h3>
          </div>
          <p className="text-gray-200 leading-relaxed">{insights.summary || 'Document processed successfully.'}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-green-400">Key Topics</h3>
            </div>
            <div className="space-y-2">
              {keyTopics.length > 0 ? keyTopics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-200">{topic}</span>
                </div>
              )) : <p className="text-gray-400">No topics identified.</p>}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-400">Action Items</h3>
            </div>
            <div className="space-y-2">
              {actionItems.length > 0 ? (
                actionItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No action items identified.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-lg">🏷️</span>
            </div>
            <h3 className="text-xl font-semibold text-cyan-400">Key Entities</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(entities).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-cyan-300 capitalize">{category}</h4>
                {Array.isArray(items) && items.length > 0 ? (
                  <div className="space-y-1">
                    {items.map((item, index) => (
                      <div key={index} className="px-3 py-1 bg-cyan-900/20 rounded-lg text-sm text-gray-200">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">None found</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-pink-400">Document Statistics</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {documentStats.estimated_reading_time || '—'}
              </div>
              <div className="text-sm text-gray-400">Reading Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {insights.sentiment || 'Neutral'}
              </div>
              <div className="text-sm text-gray-400">Sentiment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {documentStats.complexity_score || '—'}
              </div>
              <div className="text-sm text-gray-400">Complexity</div>
            </div>
          </div>

          {metadata && (
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Pages</p>
                <p className="text-lg font-semibold text-white">{metadata.page_count || '—'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Chunks</p>
                <p className="text-lg font-semibold text-white">{metadata.num_chunks || '—'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Words</p>
                <p className="text-lg font-semibold text-white">{metadata.word_count || '—'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}