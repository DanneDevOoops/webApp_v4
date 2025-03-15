import globals from 'globals';
import pluginJs from '@eslint/js';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import reactNative from 'eslint-plugin-react-native';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        ignores: [
            'node_modules',
            'dist',
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
        ],
    },
    {
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
            jsdoc: jsdoc,
            'react-native': reactNative,
        },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'prettier/prettier': 'error',
            'jsdoc/require-description': 'error',
            'jsdoc/check-values': 'error',

            // My Rules...
            'no-array-constructor': 'off',
            '@typescript-eslint/no-array-constructor': ['error'],
            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': ['error'],
            'no-extra-semi': 'off',
            '@/no-extra-semi': 'error',
            'no-implied-eval': 'off',
            '@typescript-eslint/no-implied-eval': ['error'],
            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': ['error'],
            'no-unused-vars': 'warn',
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
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
];
