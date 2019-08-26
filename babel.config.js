const BABELRC_ROOTS = [
  'src/*',
  'scripts/*',
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
    '@babel/plugin-transform-runtime',
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

      ],
      babelrcRoots: BABELRC_ROOTS,
    },
    development: {
      plugins: [

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
