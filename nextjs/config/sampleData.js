// Sample Data Configuration
// Extracted from index.js for better modularity and DRY principles

export const SAMPLE_PROJECTS = [
  {
    id: 'a',
    title: 'Project Title A',
    subtitle: 'by Author Name',
    description: 'Short project description goes here (placeholder).',
    tags: ['Category', 'Tag', 'Example'],
    avatar: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8H21L16.45 11.91L18.54 18L12 14.07L5.46 18L7.55 11.91L3 8H8.91L12 2Z" fill="#f2c94c" />
      </svg>
    )
  },
  {
    id: 'b',
    title: 'Project Title B',
    subtitle: 'by Author Name',
    description: 'Short project description goes here (placeholder).',
    tags: ['Category', 'Tag'],
    avatar: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#f2c94c" />
      </svg>
    )
  }
];

export const UI_TEXT = {
  fileInput: {
    placeholder: "Choose PDF file...",
    accept: "application/pdf"
  },
  questionInput: {
    placeholder: "Ask a question about the uploaded PDF"
  },
  buttons: {
    ask: "Ask"
  },
  sections: {
    answer: "Answer"
  },
  messages: {
    noAnswer: "No answer yet",
    uploadFirst: "Upload a PDF first",
    backendError: "Error: could not reach backend"
  }
};

export const API_ENDPOINTS = {
  ask: "http://localhost:8000/ask"
};