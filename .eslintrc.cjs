/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  'root': true,
  'parser': 'vue-eslint-parser',
  'plugins': [
    '@typescript-eslint'
  ],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 'latest'
  },
  'rules': {
    'eol-last': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '(next|res|req)' }],
    '@typescript-eslint/indent': ['error', 2]
  }
};
