// Styling & Tailwind Configuration
// Extracted from STYLING.md for better modularity

export const STYLING_CONFIG = {
  theme: "Glassmorphism",
  framework: "Tailwind CSS",

  setupInstructions: [
    "Install dependencies locally (run in `nextjs/`):",
    "  npm install -D tailwindcss postcss autoprefixer",
    "  npx tailwindcss init -p",
  ],

  filesModified: {
    tailwindConfig: "tailwind.config.js — content paths & theme extensions.",
    postcssConfig: "postcss.config.js — Tailwind + autoprefixer config.",
    globalStyles: "styles/globals.css — tailwind base + glassmorphism utility classes.",
    glassCard: "components/GlassCard.js — reusable glass card component.",
    header: "components/Header.js — simple page header.",
    appFile: "pages/_app.js — imports global styles.",
  },

  designNotes: {
    GlassCard:
      "Small, token-efficient component: pass `title`, `subtitle`, `avatar` and `children` (content). No heavy logic.",
    globalUtilities:
      "`.glass`, `.glass-border`, `.badge` let you compose other components quickly while keeping markup concise.",
    approach:
      "Tailwind utility-first approach keeps classes small and composable to reduce runtime tokens.",
  },

  devServer: {
    location: "nextjs/",
    command: "npm run dev",
    prerequisite: "Install tailwind & postcss dependencies first",
  },

  polishAndPerformanceTips: [
    "Keep heavy images as optimized webp and serve with next/image for automatic optimization.",
    "For animations, prefer CSS transitions over JS where possible.",
  ],

  componentProps: {
    GlassCard: {
      title: "string - Card title",
      subtitle: "string - Card subtitle",
      avatar: "string - Avatar URL/icon",
      children: "ReactNode - Card content",
    },
  },

  globalUtilities: [
    { class: ".glass", description: "Glass effect background" },
    { class: ".glass-border", description: "Glass effect border" },
    { class: ".badge", description: "Badge styling utility" },
  ],
};

export const NEXT_IMAGE_OPTIMIZATION = {
  description: "Use next/image for automatic image optimization",
  formats: ["webp"],
  benefits: ["Automatic format selection", "Lazy loading", "Size optimization"],
};

export const ANIMATION_RECOMMENDATIONS = {
  preferred: "CSS transitions",
  avoid: "Heavy JavaScript animations",
  benefits: "Better performance and reduced client-side processing",
};
