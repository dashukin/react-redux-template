
import path from 'path'
import {APP_SRC_DIR} from '../../environment';

export const alias = {
	src: 			path.resolve(APP_SRC_DIR),
	components:		path.resolve(APP_SRC_DIR, 'components'),
	constants:		path.resolve(APP_SRC_DIR, 'constants'),
	data:			path.resolve(APP_SRC_DIR, 'data'),
	'app-history':	path.resolve(APP_SRC_DIR, 'history'),
	middleware: 	path.resolve(APP_SRC_DIR, 'middleware'),
	models:			path.resolve(APP_SRC_DIR, 'models'),
	scenes:			path.resolve(APP_SRC_DIR, 'scenes'),
	scss:			path.resolve(APP_SRC_DIR, 'scss'),
	services:		path.resolve(APP_SRC_DIR, 'services'),
	selectors:		path.resolve(APP_SRC_DIR, 'selectors'),
	utils:			path.resolve(APP_SRC_DIR, 'utils')
};