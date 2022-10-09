const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@common-components': 'src/components/_common',
    '@constants': 'src/constants',
    '@hooks': 'src/hooks',
    '@modules': 'src/modules',
    '@utils': 'src/utils'
  })(config);

  return config;
};
