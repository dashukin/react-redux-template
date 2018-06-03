import {
	webpackSassLoader,
	webpackExtractCssLoader,
	webpackPostcssLoader,
	webpackStyleLoader,
} from '../loaders';

const PATTERN = '\\.s?css$';

export default {
	test: new RegExp(PATTERN),
	use: [
		webpackStyleLoader(),
		webpackExtractCssLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
};

