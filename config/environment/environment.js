/*
* Environment variables
* */

/*global
	__dirname, process
 */

import path from 'path';

export const DEV = process.env.NODE_ENV !== 'production';

export const WEBPACK_MODE_DEV = 'development';
export const WEBPACK_MODE_PROD = 'production';
export const WEBPACK_MODE_NONE = 'none';
export const WEBPACK_MODE = DEV ? WEBPACK_MODE_DEV : WEBPACK_MODE_PROD;

export const ROOT_DIR = path.resolve(__dirname, '../../');

export const CONFIG_DIR = path.resolve(ROOT_DIR, './config');
export const POSTCSS_CONFIG_ENTRY = path.resolve(CONFIG_DIR, './postcss/postcss.config');

export const APP_CONFIG_DIR = path.resolve(ROOT_DIR, './config');
export const APP_SRC_DIR = path.resolve(ROOT_DIR, './src');
export const APP_SRC_CLIENT_DIR = path.resolve(APP_SRC_DIR, './client');
export const APP_SRC_ENTRY = path.resolve(APP_SRC_CLIENT_DIR, './index.js');
export const APP_SRC_TEMPLATE_ENTRY = path.resolve(APP_SRC_CLIENT_DIR, './index.html');

export const APP_SRC_SERVER_DIR = path.resolve(APP_SRC_DIR, './server');
export const APP_SRC_SERVER_ENTRY = path.resolve(APP_SRC_SERVER_DIR, './index.js');

export const DIST_DIR = path.resolve(ROOT_DIR, './dist');
export const DIST_CLIENT_DIR = path.resolve(DIST_DIR, './client');

export const DIST_SERVER_DIR = path.resolve(DIST_DIR, './server');
export const DIST_CLIENT_STATIC_DIR = path.resolve(process.cwd(), './client');
export const DIST_CLIENT_TEMPLATE = path.resolve(DIST_CLIENT_STATIC_DIR, './index.html');

export const SERVER_PORT = 3000;

