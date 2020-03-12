module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 7,
  },
  plugins: ['react'],
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    $: true,
    process: true,
    __dirname: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
