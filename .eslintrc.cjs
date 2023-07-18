/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  'root': true,
  'parser': 'vue-eslint-parser',
  'plugins': [
    '@typescript-eslint'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 'latest'
  },
  'rules': {
    'eol-last': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    // Turn normal identation checks off,
    // as we use @typescript-eslint/indent
    'indent': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '(next|res|req)' }],
    '@typescript-eslint/indent': ['error', 2, {
      'SwitchCase': 1,
      'flatTernaryExpressions': true,
    }]
  }
};
