import express, { Router } from 'express';
import helmet from 'helmet';
import serveStatic from 'serve-static';
import Logger from 'src/common/utils/logger';
import {
  DIST_CLIENT_STATIC_DIR,
  DIST_WEBPACK_STATS_FILE_SRC,
  SERVER_PORT,
} from 'config/environment';

import { createApp } from 'src/client';
import { createAppStore } from 'src/client/store/store';

import apiRouter from './api';

import {
  cookieMiddleware,
  servicesMiddleware,
  renderMiddleware,
  errorMiddleware,
} from './middleware';

const logger = new Logger({
  name: 'Server',
});

export const startServer = () => {
  logger.info('Starting express server');
  const server = express();

  logger.info(`Express static dir: ${DIST_CLIENT_STATIC_DIR}`);
  const staticMiddleware = serveStatic(DIST_CLIENT_STATIC_DIR, {
    index: false,
  });

  server.use(helmet());
  server.use(Router());
  server.use(staticMiddleware);
  server.use([
    cookieMiddleware(),
    servicesMiddleware(),
  ]);

  server.use('/api', apiRouter);

  server.get(/.*/, renderMiddleware({
    createApp,
    createAppStore,
    logger,
    webpackStatsSrc: DIST_WEBPACK_STATS_FILE_SRC,
  }));

  server.use(errorMiddleware({
    logger,
  }));

  server.listen(SERVER_PORT);

  logger.info(`Express server started on port ${SERVER_PORT}`);
};
