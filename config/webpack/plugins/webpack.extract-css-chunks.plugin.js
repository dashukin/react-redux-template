import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { DIST_CLIENT_DIR } from '../../environment';

export const extractCSSChunksPlugin = () => (
	new ExtractCssChunks({
		path: DIST_CLIENT_DIR,
		filename: 'css/[name].[hash].css',
		chunkFilename: 'css/chunks/[id].[contenthash].css',
	})
);
