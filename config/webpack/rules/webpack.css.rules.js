import {
	webpackSassLoader,
	webpackExtractCssLoader,
	webpackPostcssLoader,
	webpackStyleLoader,
	webpackCSSLoader,
} from '../loaders';

const STYLES_PATTERN = '\\.s?css$';

export const cssRulesClient = () => ({
	test: new RegExp(STYLES_PATTERN),
	use: [
		webpackExtractCssLoader(),
		webpackCSSLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
});

export const cssRulesServer = () => ({
	test: new RegExp(STYLES_PATTERN),
	use: [
		webpackCSSLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
});
