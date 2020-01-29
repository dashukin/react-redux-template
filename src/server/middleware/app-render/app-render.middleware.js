import React from 'react';
import fse from 'fs-extra';
import { DIST_CLIENT_TEMPLATE } from 'config/environment';
import ReactDOMServer from 'react-dom/server';
import { ReportChunks } from 'react-universal-component';
import flushChunks from 'webpack-flush-chunks';
import isError from 'lodash/isError';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import isString from 'lodash/isString';

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
 * @param {Object} options
 * @param {String} name
 * @param {Object} attributes
 * @param {String} content
 * @param {Booleann} selfClosing
 */
export const createTag = (options) => {
  const {
    name,
    attributes,
    content,
    selfClosing = false,
  } = options;

  const tagContent = isString(content) && content.length
    ? content
    : '';

  const tagAttributes = reduce(attributes, (acc, value, key) => {
    const attrPair = value === true
      ? key
      : `${key}=${value}`;

    acc.push(attrPair);

    return acc;
  }, []).join(' ');

  const tagOutput = selfClosing
    ? `<${name} ${tagAttributes} />`
    : `<${name} ${tagAttributes}>${tagContent}</${name}>`;

  return tagOutput;
};

const createScriptTag = options => createTag({
  ...options,
  name: 'script',
  attributes: {
    ...options.attributes,
    type: 'text/javascript',
    defer: true,
  },
});

const createStyleTag = options => createTag({
  ...options,
  name: 'link',
  attributes: {
    ...options.attributes,
    rel: 'stylesheet',
    type: 'text/css',
  },
});

const createPreloadedStateTag = options => createTag({
  ...options,
  name: 'script',
  atributes: {
    ...options.attributes,
    type: 'text/javascript',
  },
  content: `window.__PRELOADED_STATE__ = ${options.content};`,
});


/**
 * Exctract js/css assets including dynamic chunks
 *
 *
 * @param options
 * @param {String[]} options.chunkNames - main rendered chunk names to take care of
 * @param {Object} options.webpackStats - webpack stats
 * @param {String[]} options.before
 * @param {String[]} options.after
 */
const extractChunks = (options) => {
  const {
    chunkNames,
    webpackStats,
    before,
    after,
  } = options;

  const flushedChunksData = flushChunks(webpackStats, {
    chunkNames,
    before,
    after,
  });

  const {
    scripts: scriptsList,
    stylesheets: stylesheetsList,
  } = flushedChunksData;

  const scripts = map(scriptsList, scriptSrc => createScriptTag({
    attributes: {
      src: scriptSrc,
    },
  })).join('\n');

  const styles = map(stylesheetsList, styleSrc => createStyleTag({
    attributes: {
      href: styleSrc,
    },
  })).join('\n');

  const output = {
    scripts,
    styles,
  };

  return output;
};


/**
 * Process template with data to be rendered
 *
 * @param {Object} options
 * @param {String} tpl - template string
 * @param {String} app - stringified application
 * @param {String} scripts
 * @param {String} styles
 */
const processTemplate = (options) => {
  const {
    tpl = '',
    app = '',
    state = '',
    scripts = '',
    styles = '',
  } = options;

  const processedTemplate = tpl
    .replace(/<!--TEMPLATE_APP-->/, () => app)
    .replace(/<!--TEMPLATE_APP_STATE-->/, () => state)
    .replace(/<!--TEMPLATE_APP_SCRIPTS-->/, () => scripts)
    .replace(/<!--TEMPLATE_APP_STYLES-->/, () => styles);

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
 * @param {Function} createAppHistory - basic function for app history creation
 * @param {JSON} webpackStats - webpack stats
 * @param {LoggerInstance} logger
 * @return {Function}
 */
const createRenderMiddleware = options => async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const {
    createApp,
    createAppStore,
    createAppHistory,
    webpackStats,
  } = options;

  /**
   * @see services.middleware for services initialization -
   * unique set of services required by application
   */
  const {
    services,
  } = res.locals;

  const history = createAppHistory({
    path: req.path,
  });

  const store = await createAppStore({
    services,
    history,
    isSSR: true,
  });

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

  const { scripts, styles } = extractChunks({
    chunkNames: renderedChunkNames,
    webpackStats,
    before: ['vendors'],
    after: ['main'],
  });

  const appState = createPreloadedStateTag({
    content: stringifyState(store.getState()),
  });

  // Replace template placeholders with appropriate data
  const responseBody = processTemplate({
    tpl: template,
    app: stringifiedApp,
    state: appState,
    scripts,
    styles,
  });

  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.send(responseBody);
};

export default createRenderMiddleware;
