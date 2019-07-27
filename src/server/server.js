import fse from 'fs-extra';
import express, { Router } from 'express';
import helmet from 'helmet';
import serveStatic from 'serve-static';

import {
  DIST_CLIENT_STATIC_DIR,
  DIST_CLIENT_TEMPLATE,
  SERVER_PORT,
} from 'config/environment';

const logger = (msg) => {
  // eslint-disable-next-line no-console
  console.log(msg);
};

export const startServer = () => {
  logger('Starting express server...');
  const server = express();

  logger('Using static dir:', DIST_CLIENT_STATIC_DIR);
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
        logger(err.message);
      });
  });

  server.listen(SERVER_PORT);

  logger(`Express server started on port ${SERVER_PORT}`);
};
