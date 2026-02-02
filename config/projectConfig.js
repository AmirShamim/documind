// Project Configuration - DocuMind
// Extracted from PROJECT_OVERVIEW.md for better modularity

export const PROJECT_CONFIG = {
  name: "DocuMind",
  elevatorPitch:
    "Students and professionals waste hours reading documents. DocuMind turns any PDF into a conversational AI assistant. Upload → Ask → Learn in seconds.",

  directories: {
    nextjs: "Next.js UI placeholder (quick demo)",
    rag: "Python RAG (Retrieval-Augmented Generation) building blocks",
    utils: "Helper utilities (zipping assets, ensure directories, etc.)",
    config: "Configuration files for modularity and DRY principles",
  },

  configFiles: {
    projectConfig: "config/projectConfig.js - Project overview and settings",
    stylingConfig: "nextjs/config/stylingConfig.js - Styling and UI configuration",
    sampleData: "nextjs/config/sampleData.js - Sample data and UI text constants",
  },

  pages: {
    index: "nextjs/pages/index.js - Home page with file upload and chat interface",
    about: "nextjs/pages/about.js - About DocuMind and team information",
    features: "nextjs/pages/features.js - Feature showcase and benefits",
    "how-it-works": "nextjs/pages/how-it-works.js - Technical process explanation",
    demo: "nextjs/pages/demo.js - Interactive examples and sample documents",
    docs: "nextjs/pages/docs.js - Project documentation and guides",
    contact: "nextjs/pages/contact.js - Support, FAQ, and contact form",
  },

  components: {
    Layout: "nextjs/components/Layout.js - Main layout wrapper with header and footer",
    HomePage: "nextjs/components/HomePage.js - Main UI with state management",
    Header: "nextjs/components/Header.js - Site header with navigation",
    Navigation: "nextjs/components/Navigation.js - Main site navigation",
    Footer: "nextjs/components/Footer.js - Site footer with links",
    GlassCard: "nextjs/components/GlassCard.js - Reusable glass card component",
    ProjectDocs: "nextjs/components/ProjectDocs.js - Dynamic project documentation",
    StylingGuide: "nextjs/components/StylingGuide.js - Styling configuration display",
  },

  ragModules: {
    loader: {
      file: "loader.py",
      description: "PDF loading utilities (uses `pypdf` by default). Extracts raw text from PDFs.",
    },
    chunker: {
      file: "chunker.py",
      description: "Naive text chunking function to split large documents into smaller chunks suitable for embeddings.",
    },
    embedder: {
      file: "embedder.py",
      description: "Wrapper around `sentence-transformers` to create vector embeddings for chunks and queries.",
    },
    vectordb: {
      file: "vectordb.py",
      description: "FAISS-based in-memory vector store wrapper with simple add/search APIs.",
    },
    qa: {
      file: "qa.py",
      description:
        "High-level flow that ties the components together: load PDF → chunk → embed → build/search index → return top contexts.",
    },
  },

  runtimeFlow: [
    "User uploads a PDF and submits a question via the Next.js UI.",
    "Frontend sends the file and question to the backend (e.g., a FastAPI endpoint at `POST /ask`).",
    "Backend uses `rag/loader.py` to extract text and `rag/chunker.py` to create chunks.",
    "`rag/embedder.py` converts chunks to embeddings; `rag/vectordb.py` builds a FAISS index and performs similarity search using the question embedding.",
    "`rag/qa.py` returns the top matching chunks and a `combined_context` string. Optionally the backend then calls an LLM (OpenAI / other) with the question + contexts to generate a polished answer.",
    "The frontend displays the answer and optionally shows the supporting contexts.",
  ],

  backendSetup: {
    location: "backend/app.py (not scaffolded here to keep the skeleton minimal)",
    endpoint: "POST /ask",
    expects: ["file", "question (multipart form)"],
  },

  nextSteps: [
    "Add `backend/app.py` with a `POST /ask` endpoint that saves uploaded file to a temp folder, calls `rag.answer_question_from_pdf()`, and optionally calls an LLM (OpenAI) to synthesize an answer from the `combined_context`",
    "Add a minimal `Dockerfile` or `Procfile` for easy deployment.",
    "Add sample PDF(s) in `demo/` and a short demo GIF for presentation.",
    "Add unit tests in `rag/tests/` for `chunker`, `embedder` (smoke), and `loader`.",
  ],

  hackathonTips: [
    "Keep prompts in a single file for quick iteration (e.g., `rag/prompts.py`).",
    "Use `sentence-transformers` + `faiss-cpu` for fast local retrieval without needing a cloud setup.",
    "If LLM quota or latency is a concern, prepare a fallback: pre-generate answers for a few sample PDFs and keep them in `demo/` for a smooth live demo.",
  ],
};
