import { useState, useEffect } from 'react';
import docService from '../utils/docService';

export default function InsightsSection({ docId }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (docId) {
      fetchInsights();
    }
  }, [docId]);

  const fetchInsights = async () => {
    if (!docId) return;
    setLoading(true);
    setError(null);
    try {
      // For now, we'll create a mock insights response
      // In production, this would call the /insights/{doc_id} endpoint
      const mockInsights = {
        summary: "This document contains important information about AI and document processing. It discusses various techniques for extracting insights from text documents and provides guidance on implementation.",
        key_topics: [
          "Document Processing",
          "AI Insights",
          "Text Analysis",
          "Information Extraction"
        ],
        entities: {
          people: ["John Smith", "Sarah Johnson"],
          organizations: ["Tech Corp", "AI Institute"],
          dates: ["2024-01-15", "2024-02-01"],
          locations: ["San Francisco", "New York"]
        },
        action_items: [
          "Implement document chunking strategy",
          "Set up vector embeddings",
          "Create query processing pipeline"
        ],
        sentiment: "Neutral",
        document_stats: {
          estimated_reading_time: "5 minutes",
          complexity_score: "Medium"
        }
      };

      // Simulate API delay
      setTimeout(() => {
        setInsights(mockInsights);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError('Failed to load insights');
      setLoading(false);
    }
  };

  if (!docId) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Document Insights
          </h2>
          <p className="text-gray-400 text-lg">Upload a document to see AI-extracted insights</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Analyzing Document...
          </h2>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Document Insights
        </h2>
        <p className="text-gray-400 text-lg">AI-extracted insights from your document</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Summary */}
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-lg">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-400">Summary</h3>
          </div>
          <p className="text-gray-200 leading-relaxed">{insights.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Topics */}
          <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-green-400">Key Topics</h3>
            </div>
            <div className="space-y-2">
              {insights.key_topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="text-gray-200">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-400">Action Items</h3>
            </div>
            <div className="space-y-2">
              {insights.action_items.length > 0 ? (
                insights.action_items.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No action items identified</p>
              )}
            </div>
          </div>
        </div>

        {/* Entities */}
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-lg">🏷️</span>
            </div>
            <h3 className="text-xl font-semibold text-cyan-400">Key Entities</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(insights.entities).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-cyan-300 capitalize">{category}</h4>
                {items.length > 0 ? (
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

        {/* Document Stats */}
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-pink-400">Document Statistics</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {insights.document_stats.estimated_reading_time}
              </div>
              <div className="text-sm text-gray-400">Reading Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {insights.sentiment}
              </div>
              <div className="text-sm text-gray-400">Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {insights.document_stats.complexity_score}
              </div>
              <div className="text-sm text-gray-400">Complexity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}