/*
 * Api service
 * */

/*global
 fetch
 */

/**
 * @name store
 * @property get
 * @property set
 * @property remove
 */

import restful, {fetchBackend}
					from 'restful.js';
import Promise		from 'bluebird';
import store		from 'store';
import fetch		from 'isomorphic-fetch';
import get			from 'lodash/get';
import pickBy		from 'lodash/pickBy';

import exampleResponse from './mock/example.mock';

import config from 'src/config';

class Api {

	/**
	 *
	 * @param [props]
	 * @param props.onError {Function} Error callback
	 */
	constructor(props) {

		/**
		 * @name rest {Object}
		 * @property one {Function}
		 * @property all {Function}
		 * @property custom {Function}
		 * @property addResponseInterceptor {Function}
		 * @property addErrorInterceptor {Function}
		 * @property header {Function}
		 */

		/**
		 * @name api {Object}
		 * @property one {Function}
		 * @property all {Function}
		 * @property custom {Function}
		 * @property addResponseInterceptor {Function}
		 * @property addErrorInterceptor {Function}
		 * @property header {Function}
		 */

		const rest 	= restful(config.REST_URL, fetchBackend(fetch));
		const api 	= restful(config.API_URL, fetchBackend(fetch));

		rest.addRequestInterceptor((request) => {
			const {data, headers} = request;

			return request
		});

		api.addRequestInterceptor((request) => {
			const {data, headers} = request;

			return request;
		});

		this.rest 	= rest;
		this.api 	= api;


		this.responseInterceptor = null;
		this.errorInterceptor = null;

	}

	/**
	 *
	 * @param props {Object}
	 * @param props.requestInterceptor {Function}
	 * @param props.responseInterceptor {Function}
	 * @param props.errorInterceptor {Function}
	 */
	configure (props) {

		const __dummy = () => {
		};

		const {
			requestInterceptor = __dummy,
			responseInterceptor = __dummy,
			errorInterceptor = __dummy
		} = props;

		const {rest} = this;

		rest.addRequestInterceptor(requestInterceptor);
		rest.addResponseInterceptor(responseInterceptor);
		rest.addErrorInterceptor(errorInterceptor);

	}

	fetchData = () => {
		return new Promise((resolve, reject) => {
			resolve(exampleResponse);
		});
	}

}

export default new Api();