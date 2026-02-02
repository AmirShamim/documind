import { STYLING_CONFIG } from '../config/stylingConfig.js';

export default function GlassCard({ title, subtitle, children, avatar, className = '' }) {
  // Use styling config for consistent class names
  const glassClass = STYLING_CONFIG.globalUtilities.find(util => util.class === '.glass')?.class?.replace('.', '') || 'glass';
  const borderClass = STYLING_CONFIG.globalUtilities.find(util => util.class === '.glass-border')?.class?.replace('.', '') || 'glass-border';

  return (
    <div className={`${borderClass} ${className}`}>
      <div className={`${glassClass} p-6 md:p-8 rounded-[18px] relative`}>
        <div className="flex items-start justify-between">
          <div>
            {title && <h3 className="text-2xl md:text-3xl font-semibold mb-1">{title}</h3>}
            {subtitle && <div className="text-sm text-gray-300 mb-3">{subtitle}</div>}
          </div>
          {avatar && (
            <div className="avatar-accent ml-4 shadow-glow-yellow">
              {typeof avatar === 'string' ? <img src={avatar} alt="icon" className="w-9 h-9 object-contain rounded-md"/> : avatar}
            </div>
          )}
        </div>

        <div className="mt-4 text-gray-200 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
