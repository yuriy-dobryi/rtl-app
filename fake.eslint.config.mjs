import eslintJs from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintReact from 'eslint-plugin-react';
import eslintTs from 'typescript-eslint';

const project = './tsconfig.json';

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
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
      react: eslintReact,
      perfectionist,
    },
  },
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 'never',
          groups: [
            ['react', 'react-native'],
            'external-type',
            'external',
            { newlinesBetween: 'always' },
            [
              'internal',
              'internal-type',
              'parent-type',
              'sibling-type',
              'index-type',
            ],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['^react$'],
              'react-native': '^react-native$',
              '@expo/vector-icons': ['^@expo/vector-icons.*'],
            },
            type: {
              react: ['^react$', '^react-native$', '^react-.+'],
            },
          },
          environment: 'node',
        },
      ],
    },
  },
);
