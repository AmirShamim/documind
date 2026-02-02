# Styling & Tailwind Setup (Glassmorphism theme)

This project uses Tailwind CSS to implement a glassmorphism look and feel similar to the provided design example.

1. Install dependencies locally (run in `nextjs/`):
   - npm install -D tailwindcss postcss autoprefixer
   - npx tailwindcss init -p

2. Files added/changed for styling
   - `tailwind.config.js` — content paths & theme extensions.
   - `postcss.config.js` — Tailwind + autoprefixer config.
   - `styles/globals.css` — tailwind base + glassmorphism utility classes.
   - `components/GlassCard.js` — reusable glass card component.
   - `components/Header.js` — simple page header.
   - `pages/_app.js` — imports global styles.

3. Design notes & reusability
   - `GlassCard` is a small, token-efficient component: pass `title`, `subtitle`, `avatar` and `children` (content). No heavy logic.
   - Global utilities (`.glass`, `.glass-border`, `.badge`) let you compose other components quickly while keeping markup concise.
   - Tailwind utility-first approach keeps classes small and composable to reduce runtime tokens.

4. Running the dev server
   - From `nextjs/`: `npm run dev` after installing tailwind & postcss dependencies.

5. Tips for polish & performance
   - Keep heavy images as optimized webp and serve with next/image for automatic optimization.
   - For animations, prefer CSS transitions over JS where possible.

If you want, I can now:
- Add `next.config.js` and `next/image` examples, or
- Install tailwind packages for you and run the dev server (tell me to run commands).