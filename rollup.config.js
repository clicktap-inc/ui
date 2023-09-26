// eslint-disable-next-line @typescript-eslint/no-var-requires
const nrwlConfig = require('@nx/react/plugins/bundle-rollup');

module.exports = (config) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const nxConfig = nrwlConfig(config);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return {
    ...nxConfig,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    output: {
      ...nxConfig.output, globals:
      {
        ['styled-components']: 'styled'
      }
    },
  };
};
