import Api from 'src/common/services/api';

class I18nApi extends Api {
  fetchLocale = (language = 'en') => new Promise((resolve, reject) => {
    if (!SSR) {
      import(/* webpackMode: "lazy" */ `src/common/locale/dictionary/${language}.properties`)
        .then((dictionary) => {
          resolve(dictionary);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const dictionary = require(`src/common/locale/dictionary/${language}.properties`);
      resolve(dictionary);
    }
  });
}

export default I18nApi;
