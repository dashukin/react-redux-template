/*
* Application config
* */

/**
 * @name process
 * @type {Object}
 * @property env
 */

const DEV 					= false; //process.env.NODE_ENV !== 'production';
const PROTOCOL				= DEV ? 'http' : 'https';
const SERVER_URL 			= DEV ? 'dev.example.com' : 'example.com';
const PORT					= 80;
const REST_URL				= `${PROTOCOL}://${SERVER_URL}/rest`;
const API_URL				= `${PROTOCOL}://${SERVER_URL}/api`;
const WS_PORT				= 9190;
const WS_SERVER_URL			= DEV ? 'dev.example.com' : 'example.co';
const WS_SRC				= `//${WS_SERVER_URL}:${WS_PORT}/socket.io/socket.io.js`;
const WS_URL				= `ws://${WS_SERVER_URL}:${WS_PORT}`;

const ROOT_ID				= 'app-root';


const appConfig = {
	DEV,
	SERVER_URL,
	REST_URL,
	API_URL,
	WS_SRC,
	WS_URL,
	ROOT_ID
};

export default appConfig;