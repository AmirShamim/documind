import { PROJECT_CONFIG } from '../../config/projectConfig.js';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header>
      <Navigation />
      <div className="py-12 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center">🧠</div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{PROJECT_CONFIG.name.toUpperCase()}</h1>
          </div>
          <p className="text-gray-300 text-lg">{PROJECT_CONFIG.elevatorPitch}</p>
        </div>
      </div>
    </header>
  )
}
