module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'ordered-imports': 0,
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // @TODO: Commented due the chaining-optional-operator bug: https://github.com/typescript-eslint/typescript-eslint/issues/2728
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        // All the @typescript-eslint/* rules here...
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: './',
        project: './tsconfig.json',
      },
    },
  ],
};
