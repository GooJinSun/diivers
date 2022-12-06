const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@common-components': 'src/components/_common',
    '@mobile-components': 'src/components/_mobile',
    '@constants': 'src/constants',
    '@hooks': 'src/hooks',
    '@modules': 'src/modules',
    '@queries': 'src/queries',
    '@utils': 'src/utils',
    '@styles': 'src/styles'
  })(config);

  return config;
};
