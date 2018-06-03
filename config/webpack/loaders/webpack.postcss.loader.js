/**
 * PostCSS loader
 */

import {POSTCSS_CONFIG_ENTRY} from '../../environment';

export const webpackPostcssLoader = () => ({
	loader: 'postcss-loader',
	options: {
		config: {
			path: POSTCSS_CONFIG_ENTRY,
		},
	},
});