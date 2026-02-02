import { useState } from 'react';
import docService from '../utils/docService';

export default function UploadSection({ docId, setDocId, setError }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await docService.uploadPdf(file);
      setDocId(res.doc_id);
      docService.setStoredDocId(res.doc_id);
    } catch (err) {
      setError(err?.message || 'Error uploading document. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Upload Your Document
        </h2>
        <p className="text-gray-400 text-lg">Start by uploading a PDF to create your AI assistant</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-8 backdrop-blur-sm">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select PDF File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-400/20"
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing Document...
                  </div>
                ) : (
                  'Upload & Process Document'
                )}
              </button>
            </div>
          </form>

          {docId && (
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <span className="text-lg">✅</span>
                <span className="font-medium">Document Ready!</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Document ID: {docId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}