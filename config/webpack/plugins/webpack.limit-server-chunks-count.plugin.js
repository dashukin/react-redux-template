/*
* Limit server side build with one chunk only to disable dynamic imports
* */

import webpack from 'webpack';

export const limitServerChunksCountPlugin = () => (
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1,
	})
);
