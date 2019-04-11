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
    SSR: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'import/namespace': ['on', { allowComputed: true }],
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 'off',
    'eact/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack/webpack.config.babel.js'
      }
    }
  }
};
