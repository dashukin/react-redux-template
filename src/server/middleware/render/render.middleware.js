import fse from 'fs-extra';
import { DIST_CLIENT_TEMPLATE } from 'config/environment';
import ReactDOMServer from 'react-dom/server';
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
  } = options;

  const processedTemplate = tpl.replace(/<!--TEMPLATE_APP-->/, app);

  return processedTemplate;
};

/**
 *
 * @param {Object} options
 * @param {Function} createApp - basic function to create application
 * @param {Function} createStore - basic function for store creation
 * @param {LoggerInstance} logger
 * @return {Function}
 */
const renderMiddleware = options => async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { createApp, createStore, logger } = options;
  /**
   * @see services.middleware for services initialization -
   * unique set of services required by application
   */
  const { services } = res.locals;
  const store = await createStore({
    services,
  });

  logger.info('store', store);

  const app = createApp({
    store,
    services,
  });

  const template = await getTemplate();

  if (isError(template)) {
    next(template);
  }

  const stringifiedApp = ReactDOMServer.renderToString(app);

  // Replace template placeholders with appropriate data
  const responseBody = processTemplate({
    tpl: template,
    app: stringifiedApp,
  });

  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.send(responseBody);
};

export default renderMiddleware;
