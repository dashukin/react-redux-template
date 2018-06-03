/*
* Webpack image rules
* */

import {webpackImageLoader} from '../loaders';

export default {
	test: /\.(png|jpg|gif)$/,
	use: [
		webpackImageLoader(),
	],
};