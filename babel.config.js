const BABELRC_ROOTS = [
  '.',
  'src/*',
];

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          browsers: [
            'last 2 versions', 'safari >= 7',
          ],
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    // https://github.com/faceyspacey/babel-plugin-universal-import
    'universal-import',
  ],
  env: {
    production: {
      plugins: [
        '@babel/runtime',
      ],
      babelrcRoots: BABELRC_ROOTS,
    },
    development: {
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
      babelrcRoots: BABELRC_ROOTS,
    },
    test: {
      plugins: [
        'dynamic-import-node',
      ],
    },
  },
};
