module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: 'next' },
    ],
    'prettier/prettier': 'error',
  },
};
