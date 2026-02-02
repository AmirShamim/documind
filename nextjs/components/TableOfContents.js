import { useState, useEffect } from 'react';

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    // ProjectDocs sections
    { id: 'project-overview', title: 'DocuMind', subtitle: 'Project Overview' },
    { id: 'project-structure', title: 'Project Structure', subtitle: 'Directory Overview' },
    { id: 'rag-modules', title: 'RAG Modules', subtitle: 'Core Components' },
    { id: 'runtime-flow', title: 'Runtime Flow', subtitle: 'How the System Works' },
    { id: 'backend-setup', title: 'Backend Setup', subtitle: 'API Configuration' },
    { id: 'next-steps', title: 'Next Steps', subtitle: 'Development Roadmap' },
    { id: 'hackathon-tips', title: 'Hackathon Tips', subtitle: 'Best Practices' },
    // StylingGuide sections
    { id: 'styling-configuration', title: 'Styling Configuration', subtitle: 'Glassmorphism Theme' },
    { id: 'performance-tips', title: 'Performance Tips', subtitle: 'From Configuration' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-8">
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Table of Contents</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-yellow-400 text-black font-medium'
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <div className="font-medium">{section.title}</div>
              <div className="text-xs opacity-75">{section.subtitle}</div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}