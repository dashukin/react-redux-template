import pino from 'pino';
import isString from 'lodash/isString';

/**
 * @typedef {Object} LoggerInstance
 *
 * @property {Function} trace
 * @property {Function} debug
 * @property {Function} info
 * @property {Function} warn
 * @property {Function} error
 * @property {Function} fatal
 */

/**
 * @typedef {Object} PinoOptions
 *
 * @param {String} name - logger name
 * @param {Boolean} prettyPrint
 */

class Logger {
  /**
   * @param {Object} props
   * @param {Object} options
   * @param {String} options.name
   */
  constructor(options = {}) {
    const pinoProps = Logger.transformToPinoProps(options);
    this._logger = pino(pinoProps);
  }

  /**
   *
   * @param {Object} [options]
   * @param {String} [options.name] - logger name
   * @param {Boolean} [options.pretty] - default true
   *
   * @return {PinoOptions} - pino options
   */
  static transformToPinoProps(options = {}) {
    const trasnformedOptions = {};
    trasnformedOptions.name = isString(options.name) && options.name.length
      ? options.name
      : undefined;
    trasnformedOptions.prettyPrint = options.pretty !== false;

    return trasnformedOptions;
  }

  trace(...data) {
    this._logger.trace(...data);
  }

  debug(...data) {
    this._logger.debug(...data);
  }

  info(...data) {
    this._logger.info(...data);
  }

  warn(...data) {
    this._logger.warn(...data);
  }

  error(...data) {
    this._logger.error(...data);
  }

  fatal(...data) {
    this._logger.fatal(...data);
  }
}

export default Logger;
