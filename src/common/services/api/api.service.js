import axios from 'axios';
import merge from 'lodash/merge';
import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import forEach from 'lodash/fp/forEach';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

const defaultConfig = {
  timeout: 25000,
};

// eslint-disable-next-line no-unused-vars
class Api {
  /**
   *
   * @param options
   * @param {Array} [options.requestInterceptors]
   * @param {Array} [options.responseInterceptors]
   */
  constructor(options = {}) {
    const config = merge(defaultConfig, {
      transformRequest: [this._transformRequest],
      transformResponse: [this._transformResponse],
    });

    this._instance = axios.create(config);

    const requestInterceptors = options.requestInterceptors || [];
    const responseInterceptors = options.responseInterceptors || [];

    this._applyRequestInterceptors(requestInterceptors);
    this._applyResponseInterceptors(responseInterceptors);
  }

  _applyRequestInterceptors = forEach(
    interceptor => this._instance.interceptors.request.use(interceptor),
  );

  _applyResponseInterceptors = forEach(
    interceptor => this._instance.interceptors.response.use(interceptor),
  );

  _transformRequest(data) {
    return data;
  }

  _transformResponse(data) {
    return data;
  }

  request(url, method, params, body, headers) {
    const requestConfig = {
      url,
      method,
      params,
      data: body,
      headers,
    };
    const meaningfulRequestConfig = pickBy(requestConfig, data => !isNil(data));

    return this._instance.request(meaningfulRequestConfig);
  }

  get(url, params, headers) {
    return this.request(url, GET, params, null, headers);
  }

  post(url, params, body, headers) {
    return this.request(url, POST, params, body, headers);
  }

  put(url, params, body, headers) {
    return this.request(url, PUT, params, body, headers);
  }

  delete(url, params, body, headers) {
    return this.request(url, DELETE, params, body, headers);
  }
}

export default Api;
