import GlassCard from './GlassCard';
import { SAMPLE_PROJECTS } from '../config/sampleData.js';

export default function ProjectsGrid() {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Explore More Features
        </h2>
        <p className="text-gray-400 text-lg">Discover what DocuMind can do for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLE_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="transform hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <GlassCard
              title={project.title}
              subtitle={project.subtitle}
              avatar={project.avatar}
              className="h-full hover:shadow-2xl hover:shadow-yellow-400/10"
            >
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-300 text-xs rounded-full border border-yellow-400/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}