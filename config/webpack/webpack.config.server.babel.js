/*
* Webpack config for server build
* */

/*global process */

import {
	jsRules,
	cssRulesServer,
	imageRules,
} from './rules';
import {
	noEmitOnErrorPlugin,
	progressBarPlugin,
	cleanServerDirPlugin,
	limitServerChunksCountPlugin,
	extractCSSChunksPlugin,
	definePlugin,
} from './plugins';

import { alias } from './resolve';

import {
	DEV,
	WEBPACK_MODE,
	APP_SRC_SERVER_ENTRY,
	DIST_SERVER_DIR,
} from '../environment';

const serverConfig = {
	mode: WEBPACK_MODE,
	watch: DEV,
	target: 'node',
	entry: [
		APP_SRC_SERVER_ENTRY,
	],
	output: {
		path: DIST_SERVER_DIR,
		filename: 'index.js',
	},
	module: {
		rules: [
			jsRules(),
			cssRulesServer(),
			imageRules(),
		],
	},
	plugins: [
		cleanServerDirPlugin(),
		progressBarPlugin({
			name: 'Server',
		}),
		noEmitOnErrorPlugin(),
		limitServerChunksCountPlugin(),
		extractCSSChunksPlugin(),
		definePlugin({
			PRODUCTION: true,
			SSR: JSON.stringify(true)
		}),
	],
	resolve: {
		alias: alias()
	}
};

export default serverConfig;
