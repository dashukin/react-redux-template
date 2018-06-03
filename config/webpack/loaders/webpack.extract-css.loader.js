/*
* Extract css loader
* */

/**
 * @name MiniCssExtractPlugin
 * @property {Function} loader
 */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const webpackExtractCssLoader = () =>  (
	MiniCssExtractPlugin.loader
);