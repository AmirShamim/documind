import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import UploadSection from './UploadSection';
import QuerySection from './QuerySection';
import AnswerSection from './AnswerSection';
import InsightsSection from './InsightsSection';
import ProjectsGrid from './ProjectsGrid';
import ErrorModal from './ErrorModal';
import docService from '../utils/docService';

export default function HomePage() {
  const [docId, setDocId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = docService.getStoredDocId();
    if (stored) setDocId(stored);
  }, []);

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {/* Error Modal */}
      <ErrorModal
        error={error}
        onClose={handleCloseError}
        autoCloseDelay={3000}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Upload Section */}
        <UploadSection
          docId={docId}
          setDocId={setDocId}
          setError={setError}
        />

        {/* Query Section */}
        <QuerySection
          docId={docId}
          setAnswer={setAnswer}
          setError={setError}
        />

        {/* Answer Section */}
        <AnswerSection answer={answer} />

        {/* Insights Section */}
        <InsightsSection docId={docId} />

        {/* Projects Grid */}
        <ProjectsGrid />
      </div>
    </div>
  );
}