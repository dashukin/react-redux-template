import webpack from 'webpack';

/**
 * @name webpack
 * @property {Function} DefinePlugin
 */

export const definePlugin = (props) => (
	new webpack.DefinePlugin({
		...props
	})
);