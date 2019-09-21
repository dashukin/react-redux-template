module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    PRODUCTION: 'readonly',
    SSR: 'readonly',
    jest: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    process: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'import/namespace': ['on', { allowComputed: true }],
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 'off',
    'eact/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',
    'no-use-before-define': 'off',
    'jsx-uses-vars': 'on',
    'jsx-uses-react': 'on'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack/webpack.config.client.babel.js'
      }
    }
  }
};
