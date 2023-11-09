/** @type {import("eslint").Linter.Config} */
const config = {
	extends: [
		'next/core-web-vitals',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'./base.js',
	],
}

module.exports = config
