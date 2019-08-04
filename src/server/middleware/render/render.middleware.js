import React from 'react';
import fse from 'fs-extra';
import { DIST_CLIENT_TEMPLATE } from 'config/environment';
import ReactDOMServer from 'react-dom/server';
import { ReportChunks } from 'react-universal-component';
import flushChunks from 'webpack-flush-chunks';
import isError from 'lodash/isError';

/**
 * Get rendering template
 * @return {Promise<*>}
 */
const getTemplate = async () => {
  try {
    const templateSrc = await fse.readFile(DIST_CLIENT_TEMPLATE, 'utf-8');

    return templateSrc;
  } catch (err) {
    return err;
  }
};


/**
 *
 * @param {Object} options
 * @param {String} options.src
 * @return {Promise<*>}
 */
const getWebpackStats = async (options) => {
  const { src } = options;
  const statsContent = await fse.readFile(src, 'utf-8');
  const stats = JSON.parse(statsContent);

  return stats;
};


/**
 * Process template with data to be rendered
 *
 * @param {Object} options
 * @param {String} tpl - template string
 * @param {String} app - stringified application
 */
const processTemplate = (options) => {
  const {
    tpl,
    app,
    state,
  } = options;

  const processedTemplate = tpl
    .replace(/<!--TEMPLATE_APP-->/, app)
    .replace(/<!--TEMPLATE_APP_STATE-->/, state);

  return processedTemplate;
};

const stringifyState = (state) => {
  const output = JSON.stringify(state);

  return output;
};


/**
 *
 * @param {Object} options
 * @param {Function} createApp - basic function to create application
 * @param {Function} createStore - basic function for store creation
 * @param {String} webpackStatsSrc - path to webpack stats
 * @param {LoggerInstance} logger
 * @return {Function}
 */
const renderMiddleware = options => async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const {
    createApp,
    createAppStore,
    logger,
    webpackStatsSrc,
  } = options;

  logger.info('options', options);

  /**
   * @see services.middleware for services initialization -
   * unique set of services required by application
   */
  const { services } = res.locals;
  const store = await createAppStore({
    services,
    isSSR: true,
  });

  logger.info('store', store.getState());

  const app = createApp({
    store,
    services,
  });

  const renderedChunkNames = [];
  const reportChunksHandler = chunkName => renderedChunkNames.push(chunkName);

  const wrappedApp = React.createElement(ReportChunks, {
    report: reportChunksHandler,
  }, app);

  const template = await getTemplate();

  if (isError(template)) {
    next(template);
  }

  const stringifiedApp = ReactDOMServer.renderToString(wrappedApp);

  const webpackStats = await getWebpackStats({
    src: webpackStatsSrc,
  });

  logger.info('renderedChunkNames', renderedChunkNames);

  const flushedChunksData = flushChunks(webpackStats, {
    chunkNames: renderedChunkNames,
    // list of cache groups to be included before dynamic chanks are executed
    before: ['vendors'],
    after: ['main'],
  });

  logger.info('flushedChunksData', flushedChunksData);

  // Replace template placeholders with appropriate data
  const responseBody = processTemplate({
    tpl: template,
    app: stringifiedApp,
    state: stringifyState(store.getState()),
  });

  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.send(responseBody);
};

export default renderMiddleware;
