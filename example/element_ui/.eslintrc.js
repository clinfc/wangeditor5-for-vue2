module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': ['plugin:vue/recommended', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 'off',
  },
}
