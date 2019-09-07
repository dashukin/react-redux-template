import chainalize from 'chainalize';
import I18nService from 'src/common/services/i18n';
import I18nApi from 'src/common/services/api/i18n';
import CookieService from 'src/common/services/cookie';
import LocationService from 'src/common/services/location';
import ExampleApi from './api/__example';


export const createServices = (options = {}) => {
  const { location, cookie } = options;
  const services = chainalize({
    ExampleApi,
    CookieService,
    LocationService,
    I18nService,
    I18nApi,
  }, {
    location,
    cookie,
  });

  return services;
};
