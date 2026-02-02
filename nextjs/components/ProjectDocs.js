import { PROJECT_CONFIG } from '../../config/projectConfig.js';
import GlassCard from './GlassCard';

export default function ProjectDocs() {
  return (
    <div className="space-y-8">
      <GlassCard id="project-overview" title={PROJECT_CONFIG.name} subtitle="Project Overview">
        <p className="mb-4">{PROJECT_CONFIG.elevatorPitch}</p>
      </GlassCard>

      <GlassCard id="project-structure" title="Project Structure" subtitle="Directory Overview">
        <div className="space-y-2">
          {Object.entries(PROJECT_CONFIG.directories).map(([key, description]) => (
            <div key={key} className="flex items-start">
              <code className="bg-gray-800 px-2 py-1 rounded mr-2 text-sm">{key}/</code>
              <span className="text-sm text-gray-300">— {description}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard id="rag-modules" title="RAG Modules" subtitle="Core Components">
        <div className="space-y-4">
          {Object.entries(PROJECT_CONFIG.ragModules).map(([key, module]) => (
            <div key={key} className="border-l-2 border-yellow-400 pl-4">
              <h4 className="font-semibold text-yellow-400">{module.file}</h4>
              <p className="text-sm text-gray-300 mt-1">{module.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard id="runtime-flow" title="Runtime Flow" subtitle="How the System Works">
        <ol className="space-y-2">
          {PROJECT_CONFIG.runtimeFlow.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2 font-semibold">{index + 1}.</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </GlassCard>

      <GlassCard id="backend-setup" title="Backend Setup" subtitle="API Configuration">
        <div className="space-y-2 text-sm">
          <div><strong>Location:</strong> {PROJECT_CONFIG.backendSetup.location}</div>
          <div><strong>Endpoint:</strong> {PROJECT_CONFIG.backendSetup.endpoint}</div>
          <div><strong>Expects:</strong> {PROJECT_CONFIG.backendSetup.expects.join(', ')}</div>
        </div>
      </GlassCard>

      <GlassCard id="next-steps" title="Next Steps" subtitle="Development Roadmap">
        <ol className="space-y-2">
          {PROJECT_CONFIG.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2 font-semibold">{index + 1}.</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </GlassCard>

      <GlassCard id="hackathon-tips" title="Hackathon Tips" subtitle="Best Practices">
        <ul className="space-y-2">
          {PROJECT_CONFIG.hackathonTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}