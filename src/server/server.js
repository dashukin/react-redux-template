import fse from 'fs-extra';
import express, { Router } from 'express';
import helmet from 'helmet';
import serveStatic from 'serve-static';
import Logger from 'src/common/utils/logger';

import {
  DIST_CLIENT_STATIC_DIR,
  DIST_CLIENT_TEMPLATE,
  SERVER_PORT,
} from 'config/environment';

const logger = new Logger({
  name: 'Server',
});

export const startServer = () => {
  logger.info('Starting express server...');
  const server = express();

  logger.info('Using static dir:', DIST_CLIENT_STATIC_DIR);
  const staticMiddleware = serveStatic(DIST_CLIENT_STATIC_DIR, {
    index: false,
  });

  server.use(helmet());
  server.use(Router());
  server.use(staticMiddleware);

  server.get(/.*/, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fse.readFile(DIST_CLIENT_TEMPLATE, 'utf-8')
      .then((html) => {
        res.send(html);
      })
      .catch((err) => {
        logger.error(err.message);
      });
  });

  server.listen(SERVER_PORT);

  logger.info(`Express server started on port ${SERVER_PORT}`);
};
