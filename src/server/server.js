import fse from 'fs-extra';
import express, { Router } from 'express';
import helmet from 'helmet';
import serveStatic from 'serve-static';

import {
  DIST_CLIENT_STATIC_DIR,
  DIST_CLIENT_TEMPLATE,
  SERVER_PORT,
} from 'config/environment';

export const startServer = () => {
  console.log('Starting express server...');
  const server = express();

  console.log('Using static dir:', DIST_CLIENT_STATIC_DIR);
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
        console.log(err.message);
      });
  });

  server.listen(SERVER_PORT);

  console.log(`Express server started on port ${SERVER_PORT}`);
};
