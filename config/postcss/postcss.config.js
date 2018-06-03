/*
* Webpack postcss config
* */

export default ({file, options, env}) => ({
	parser: false,
	plugins: {
		autoprefixer: true,
	},
});
