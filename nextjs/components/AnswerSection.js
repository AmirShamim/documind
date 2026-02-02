export default function AnswerSection({ answer }) {
  if (!answer) return null;

  return (
    <div className="mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Answer
          </h3>

          {/* Answer Text */}
          {answer.answer && (
            <div className="mb-6 p-6 bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.2)] rounded-lg">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {answer.answer}
              </p>
            </div>
          )}

          {/* Sources */}
          {answer.sources && answer.sources.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Sources
              </h4>
              <div className="grid gap-3">
                {answer.sources.map((source, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.2)] rounded-lg hover:border-[rgba(59,130,246,0.4)] transition-colors"
                  >
                    <div className="text-sm space-y-2">
                      {source.title && (
                        <div className="font-semibold text-blue-300">{source.title}</div>
                      )}
                      {source.page_label && (
                        <div className="text-xs text-gray-400">
                          Page {source.page_label}
                          {source.total_pages && ` of ${source.total_pages}`}
                        </div>
                      )}
                      {source.source && (
                        <div className="text-xs text-gray-500 truncate">
                          {source.source.split('/').pop()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
