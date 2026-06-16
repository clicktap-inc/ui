import webpack from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';

// Webpack5 builder (not vite): the repo is on vite 7, which Storybook 8.6's
// @storybook/builder-vite doesn't support (it crashes with
// `path.join(undefined)` in its config hook). ui-kit's Storybook uses webpack5
// for the same reason. Tailwind v3 is compiled via postcss-loader, which
// auto-discovers ./postcss.config.cjs next to the imported tailwind.css.
const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      // Components (and preview decorators) use the automatic JSX runtime and
      // don't import React. Transpile JSX to the automatic runtime so SWC
      // doesn't emit classic `React.createElement`. Mirrors root .storybook.
      name: '@storybook/addon-webpack5-compiler-swc',
      options: {
        swcLoaderOptions: {
          jsc: {
            transform: {
              react: { runtime: 'automatic' },
            },
          },
        },
      },
    },
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
      },
    },
  ],
  // Autodocs source of truth: extract the props table directly from each
  // component's TypeScript types (react-docgen-typescript) so docs never drift
  // from the code. `propFilter` keeps only the component's OWN props — not the
  // hundreds inherited from react-aria-components / DOM in node_modules.
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop: { parent?: { fileName: string } }) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // Belt-and-suspenders: the preview config (preview.tsx) and addon code are
  // not always run through the automatic-runtime SWC loader, so any classic
  // `React.createElement` output would throw "React is not defined". Provide
  // React as a global to every module so that can't happen.
  webpackFinal: async (webpackConfig) => {
    webpackConfig.plugins = webpackConfig.plugins ?? [];
    webpackConfig.plugins.push(new webpack.ProvidePlugin({ React: 'react' }));
    return webpackConfig;
  },
};

export default config;
