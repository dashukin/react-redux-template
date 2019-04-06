/*
* Extract css loader
* */

/**
 * @name ExtractCssChunks
 * @property {Function} loader
 */

import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

export const webpackExtractCssLoader = () => (
	ExtractCssChunks.loader
);
