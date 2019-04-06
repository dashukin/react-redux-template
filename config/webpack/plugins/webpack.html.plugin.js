import HtmlWebpackPlugin from 'html-webpack-plugin';
import packageJson from '../../../package';
import {APP_SRC_TEMPLATE_ENTRY} from '../../environment';

export const htmlPlugin = () => (
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: APP_SRC_TEMPLATE_ENTRY,
		inject: false,
		hash: false,
		version: packageJson.version,
		inlineSrc: 'runtime.+js$',
		minify: {
			minifyJS: true,
		},
	})
);