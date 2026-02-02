export default function AnswerSection({ answer }) {
  if (!answer) return null;

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          AI Response
        </h2>
        <p className="text-gray-400 text-lg">Here's what I found in your document</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl p-8 backdrop-blur-sm shadow-xl">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Answer</h3>
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
                  {answer.answer}
                </div>
              </div>
            </div>

            {answer.sources && answer.sources.length > 0 && (
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <span className="text-lg">📚</span>
                  Source References
                </h4>
                <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4 border border-[rgba(255,255,255,0.05)]">
                  <pre className="text-xs text-gray-400 overflow-auto max-h-48 whitespace-pre-wrap">
                    {JSON.stringify(answer.sources, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}