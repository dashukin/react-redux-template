/*
* Webpack image loader
* */

export const webpackImageLoader = () => ({
	loader: 'file-loader',
	options: {
		name: 'images/img-[hash:6].[ext]'
	}
});