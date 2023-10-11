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
    '@vue/eslint-config-typescript/recommended',
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
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '(next|res|req)' }],
    '@typescript-eslint/indent': ['error', 2, {
      'SwitchCase': 1,
      'flatTernaryExpressions': true,
    }]
  }
};
