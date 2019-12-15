import { createServices } from 'src/common/services';
import { createServerSideLocation } from './helpers/services.helper';

const servicesMiddleware = () => (req, res, next) => {
  const location = createServerSideLocation(req);
  const { cookies: cookie } = req;
  const services = createServices({
    location,
    cookie,
  });

  res.locals.services = services;

  next();
};

export default servicesMiddleware;
