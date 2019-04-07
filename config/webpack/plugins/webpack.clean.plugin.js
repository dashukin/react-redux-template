/*
* Clean plugin
* */

import CleanPlugin from 'clean-webpack-plugin';
import {
	DIST_CLIENT_DIR,
	DIST_SERVER_DIR,
} from '../../environment';

export const cleanClientDirPlugin = () => (
	new CleanPlugin({
		root: DIST_CLIENT_DIR,
		verbose: true,
		watch: false,
	})
);

export const cleanServerDirPlugin = () => (
	new CleanPlugin({
		root: DIST_SERVER_DIR,
		verbose: true,
		watch: false,
	})
);