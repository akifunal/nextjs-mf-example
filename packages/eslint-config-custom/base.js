/** @type {import("eslint").Linter.Config} */
const config = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'turbo',
		'plugin:tailwindcss/recommended',
		'prettier',
	],
	rules: {
		// These opinionated rules are enabled in stylistic-type-checked above.
		// Feel free to reconfigure them to your own preference.
		'@typescript-eslint/consistent-type-definitions': 'off',

		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_' },
		],

		'no-console': process.env.NODE_ENV === 'production' ? 1 : 1,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,

		'tailwindcss/no-custom-classname': ['off'],
		'turbo/no-undeclared-env-vars': [
			'error',
			{
				allowList: ['^NODE_ENV$'],
			},
		],
	},
	ignorePatterns: ['node_modules/', 'dist/', 'out/', '.next/'],
}

module.exports = config
