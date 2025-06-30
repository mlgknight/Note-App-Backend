import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

export default [
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser, // Use the imported parser object here!
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: { ...globals.node },
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'@stylistic/js': stylisticJs,
		},
		rules: {
			'@stylistic/js/indent': ['error', 3],
			'@stylistic/js/linebreak-style': ['error', 'unix'],
			'@stylistic/js/quotes': ['error', 'single'],
			'@stylistic/js/semi': ['error', 'always'],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-console': 'off',
		},
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'module',
			globals: { ...globals.node },
			ecmaVersion: 'latest',
		},
	},
	tseslint.config({
		files: ['**/*.ts'],
		extends: ['plugin:@typescript-eslint/recommended'],
	}),
];
