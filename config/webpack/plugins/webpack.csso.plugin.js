import CssoWebpackPlugin from 'csso-webpack-plugin';

export const cssoPlugin = () => (
	new CssoWebpackPlugin({
		restructure: true,
		forceMediaMerge: false
	})
);