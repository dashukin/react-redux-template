import { createServices } from 'src/common/services';
import { createServerHistory } from 'src/common/history';
import { createServerSideLocation } from './helpers/services.helper';

const servicesMiddleware = () => (req, res, next) => {
  const location = createServerSideLocation(req);
  const { cookies: cookie } = req;
  const services = createServices({
    location,
    cookie,
  });

  res.locals.services = services;
  res.locals.history = createServerHistory({
    path: req.path,
  });

  next();
};

export default servicesMiddleware;
