const NextFederationPlugin = require('@module-federation/nextjs-mf')
const path = require('node:path')

/** @type {import("next").NextConfig} */
const config = {
	output: 'standalone',
	reactStrictMode: true,
	experimental: {
		outputFileTracingRoot: path.join(__dirname, '../../'),
	},
	webpack(config) {
		config.plugins.push(
			new NextFederationPlugin({
				name: 'host',
				filename: 'static/chunks/remoteEntry.js',
				shared: {
					'@tanstack/react-query': {
						requiredVersion: false,
						singleton: true,
					},
				},
			}),
		)

		return config
	},
}

module.exports = config
