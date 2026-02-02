import { PROJECT_CONFIG } from '../../../config/projectConfig.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return project configuration for frontend consumption
    res.status(200).json({
      name: PROJECT_CONFIG.name,
      description: PROJECT_CONFIG.elevatorPitch,
      directories: PROJECT_CONFIG.directories,
      ragModules: PROJECT_CONFIG.ragModules,
      runtimeFlow: PROJECT_CONFIG.runtimeFlow,
      backendSetup: PROJECT_CONFIG.backendSetup
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}