import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import {DIST_CLIENT_DIR} from '../../environment';

export const miniCssExtractPlugin  = () => (
	new MiniCSSExtractPlugin({
		path: DIST_CLIENT_DIR,
		filename: 'css/[name].[hash].css',
		chunkFilename: 'css/chunks/[id].[contenthash].css',
	})
);