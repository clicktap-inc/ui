const path = require('path');
const typography = require('@tailwindcss/typography');
const reactAriaComponents = require('tailwindcss-react-aria-components');

// Storybook-only Tailwind v3 config. Mirrors apps/frontend/tailwind.config.ts
// (the real consumer) so libs/ui components render the same here as in the app:
// scans the library source, class-based dark mode, and the same plugins.
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [path.resolve(__dirname, '../src/**/*.{ts,tsx}')],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        CheckMarkStroke: { '100%': { strokeDashoffset: '0' } },
        CheckMarkScale: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
        },
        CheckMarkFill: { '100%': { boxShadow: 'inset 0px 0px 0px 30px #fff' } },
        CheckMarkFillGreen: { '100%': { boxShadow: 'inset 0px 0px 0px 30px #fff' } },
      },
    },
  },
  plugins: [typography, reactAriaComponents],
};
