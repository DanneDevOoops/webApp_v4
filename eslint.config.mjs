import globals from 'globals';
import pluginJs from '@eslint/js';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import reactNative from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import tsdoc from 'eslint-plugin-tsdoc';
import pluginJest from 'eslint-plugin-jest';
import pluginTestingLibrary from 'eslint-plugin-testing-library';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        ignores: [
            'node_modules/**/*',
            'dist',
            'docs',
            'build',
            'coverage',
            'public',
            'tmp',
            'temp',
            '.*',
            'eslint.config.mjs',
            'babel.config.js',
            'gjslint.conf',
            'react-native.config.js',
            '.*.{js,mjs,cjs,ts}',
            '__tests__',
            '__test__',
            'tests',
            'test',
        ],
    },
    {
        plugins: {
            import: importPlugin,
            react: pluginReact,
            prettier: pluginPrettier,
            jsdoc: jsdoc,
            'react-native': reactNative,
            tsdoc: tsdoc,
            jest: pluginJest,
            'testing-library': pluginTestingLibrary,
        },
        rules: {
            // eslint-plugin-react
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',

            // prettier
            'prettier/prettier': 'error',

            // eslint-plugin-jsdoc
            'jsdoc/require-description': 'warn',
            'jsdoc/check-values': 'warn',

            // eslint-plugin-tsdoc
            // 'tsdoc/syntax': 'warn',

            // sort imports - https://eslint.org/docs/latest/rules/sort-imports
            'sort-imports': [
                'error',
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: [
                        'none',
                        'all',
                        'multiple',
                        'single',
                    ],
                    allowSeparatedGroups: true,
                },
            ],

            // eslint-plugin-import
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                        ['object', 'type'],
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-duplicates': 'error',
            'import/no-self-import': 'error',
            'import/no-useless-path-segments': 'error',
            'import/no-unresolved': 'error',
            'import/no-absolute-path': 'error',

            // typescript-eslint
            '@typescript-eslint/no-array-constructor': ['error'],
            '@typescript-eslint/no-empty-function': ['error'],
            '@typescript-eslint/no-implied-eval': ['error'],
            '@typescript-eslint/no-loss-of-precision': ['error'],
            '@typescript-eslint/no-unused-vars': ['error'],
            'require-await': 'off',
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',

            // other rules
            '@/no-extra-semi': 'error',
            'no-array-constructor': 'off',
            'no-empty-function': 'off',
            'no-extra-semi': 'off',
            'no-implied-eval': 'off',
            'no-loss-of-precision': 'off',
            'no-unused-vars': 'off',

            // eslint-plugin-jest
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
        },
        languageOptions: {
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: [
                        'assets/',
                        'components/',
                        'constants/',
                        'contexts/',
                        'hooks/',
                        'interfaces/',
                        'models/',
                        'screens/',
                        'types/',
                    ],
                },
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
    },
    {
        files: [
            '**/__tests__/**/*.[jt]s?(x)',
            '**/?(*.)+(spec|test).[jt]s?(x)',
        ],
        plugins: {
            'testing-library': pluginTestingLibrary,
        },
        extends: ['plugin:testing-library/react'],
    },
];
