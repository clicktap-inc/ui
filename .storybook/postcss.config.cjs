const path = require('path');

// Tailwind v3 + autoprefixer for Storybook (mirrors the consuming app's setup).
// Vite (react-vite builder) auto-applies this via `css.postcss` in main.ts.
module.exports = {
  plugins: {
    tailwindcss: { config: path.resolve(__dirname, 'tailwind.config.cjs') },
    autoprefixer: {},
  },
};
