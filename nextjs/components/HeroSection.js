import { PROJECT_CONFIG } from '../../config/projectConfig.js';

export default function HeroSection() {
  return (
    <div className="py-16 md:py-24 text-center">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/20 animate-pulse">
            <span className="text-2xl">🧠</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            {PROJECT_CONFIG.name.toUpperCase()}
          </h1>
        </div>
        <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
          {PROJECT_CONFIG.elevatorPitch}
        </p>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>AI-Powered Document Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
}