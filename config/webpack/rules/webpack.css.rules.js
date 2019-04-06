import {
	webpackSassLoader,
	webpackExtractCssLoader,
	webpackPostcssLoader,
	webpackStyleLoader,
	webpackCSSLoader,
} from '../loaders';

const STYLES_PATTERN = '\\.s?css$';

export const CSSRulesClient = () => ({
	test: new RegExp(STYLES_PATTERN),
	use: [
		webpackExtractCssLoader(),
		webpackCSSLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
});

export const CSSRulesServer = () => ({
	test: new RegExp(STYLES_PATTERN),
	use: [
		webpackCSSLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
});

export default () => ({
	test: new RegExp(STYLES_PATTERN),
	use: [
		webpackExtractCssLoader(),
		webpackStyleLoader(),
		webpackPostcssLoader(),
		webpackSassLoader(),
	],
});

