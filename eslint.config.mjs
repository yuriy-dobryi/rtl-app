import eslintJs from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import eslintUnusedImports from 'eslint-plugin-unused-imports';
import eslintTs from 'typescript-eslint';
import eslintPrettierPlugin from 'eslint-plugin-prettier';
import eslintPrettierConfig from 'eslint-config-prettier';

const project = './tsconfig.json';

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  eslintPrettierConfig,
  {
    languageOptions: {
      globals: {
        node: 'readonly',
        module: 'readonly',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project,
        },
      },
    },
    plugins: {
      prettier: eslintPrettierPlugin,
      react: eslintReact,
      import: eslintImport,
      'unused-imports': eslintUnusedImports,
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1,
        },
      ],
      // "@typescript-eslint/no-unused-vars": "off",
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      'unused-imports/no-unused-imports': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'type',
            ['internal', 'parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '~/internal/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
          distinctGroup: false,
        },
      ],
    },
  },
);
