import { STYLING_CONFIG } from '../config/stylingConfig.js';
import GlassCard from './GlassCard';

export default function StylingGuide() {
  return (
    <div className="space-y-8">
      <GlassCard title="Styling Configuration" subtitle="Glassmorphism Theme">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Theme: {STYLING_CONFIG.theme}</h4>
            <p className="text-sm text-gray-300">Framework: {STYLING_CONFIG.framework}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Global Utilities:</h4>
            <div className="space-y-1">
              {STYLING_CONFIG.globalUtilities.map((util, index) => (
                <div key={index} className="text-sm">
                  <code className="bg-gray-800 px-2 py-1 rounded">{util.class}</code>
                  <span className="text-gray-300 ml-2">— {util.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">GlassCard Props:</h4>
            <div className="space-y-1">
              {Object.entries(STYLING_CONFIG.componentProps.GlassCard).map(([prop, desc]) => (
                <div key={prop} className="text-sm">
                  <code className="bg-gray-800 px-2 py-1 rounded">{prop}</code>
                  <span className="text-gray-300 ml-2">— {desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard title="Performance Tips" subtitle="From Configuration">
        <ul className="space-y-2 text-sm">
          {STYLING_CONFIG.polishAndPerformanceTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}