import UniversalCookie from 'universal-cookie';
import LocationService from 'src/common/services/location';
import pipe from 'lodash/fp/compose';
import split from 'lodash/fp/split';
import filter from 'lodash/fp/filter';
import identity from 'lodash/identity';
import get from 'lodash/get';

/**
 * @typedef {Object} CookieOptions
 *
 * @property {String} path
 * @property {Date} expires
 * @property {Number} [maxAge]
 * @property {String} [domain]
 * @property {Boolean} [secure]
 * @property {Boolean} [httpOnly]
 * @property {Boolean|String} [sameSite] - possible string values: "lax"|"strict"
 */

class CookieService {
  constructor({ cookie, locationService }) {
    this.universalCookie = new UniversalCookie(cookie);
    this.locationService = locationService;
  }

  getCookieDomain = () => {
    let cookieDomain;
    const hostname = get(this.locationService.location, 'hostname', '');
    const hostnameParts = pipe(
      filter(identity),
      filter(value => value !== 'www'),
      split('.'),
    )(hostname);

    if (hostnameParts.length === 1) {
      [cookieDomain] = hostnameParts;
    } else {
      cookieDomain = `.${hostnameParts.join('.')}`;
    }

    return cookieDomain;
  }

  /**
   *
   * @param {String} name
   * @param {String|Object} value
   * @param {Object} [options]
   */
  set = (name, value) => {
    this.universalCookie.set(name, value, {
      path: '/',
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      domain: this.getCookieDomain(),
    });
  }

  /**
   * Get cookie value
   * @param {String} name
   */
  get = (name) => {
    const cookieValue = this.universalCookie.get(name);

    return cookieValue;
  }

  getAll = () => {
    const output = this.universalCookie.getAll();

    return output;
  }
}

CookieService.dependencies = {
  LocationService,
};

export default CookieService;
