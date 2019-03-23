module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				"useBuiltIns": "entry",
				"targets": {
					"browsers": [
						"last 2 versions", "safari >= 7"
					]
				}
			}
		]
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-object-rest-spread'
	]
}