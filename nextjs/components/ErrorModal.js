import { useEffect } from 'react';

export default function ErrorModal({ error, onClose, autoCloseDelay = 3000 }) {
  useEffect(() => {
    if (error && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [error, onClose, autoCloseDelay]);

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/30 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl shadow-red-500/20 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
        >
          <span className="text-lg">×</span>
        </button>

        {/* Error icon and title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-400">Error</h3>
            <p className="text-sm text-gray-400">Something went wrong</p>
          </div>
        </div>

        {/* Error message */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-gray-200 text-sm leading-relaxed">{error}</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            OK
          </button>
        </div>

        {/* Auto-close indicator */}
        {autoCloseDelay > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full animate-shrink"
                style={{ animationDuration: `${autoCloseDelay}ms` }}
              />
            </div>
            <span>Auto-closing in {Math.ceil(autoCloseDelay / 1000)}s</span>
          </div>
        )}
      </div>
    </div>
  );
}