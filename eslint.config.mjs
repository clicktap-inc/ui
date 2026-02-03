import baseConfig from '../../eslint.config.mjs';

export default [
  // Global ignores (standalone object with only ignores key)
  {
    ignores: [
      '**/dist/**',
      'jest.config.*',
      '.storybook/**',
      '**/*.stories.*',
      'tailwind.config.js',
      'vite.config.ts',
    ],
  },

  // Base config
  ...baseConfig,
];
