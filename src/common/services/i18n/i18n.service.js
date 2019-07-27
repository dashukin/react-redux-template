import i18n from 'i18next';
import isPlainObject from 'lodash/isPlainObject';
import trim from 'lodash/trim';
import unescape from 'lodash/unescape';
import some from 'lodash/some';
import get from 'lodash/get';

import i18nOptions, {
  INTERPOLATION_OPTIONS,
  DEFAULT_LANGUAGE_CODE,
} from './i18n.options';

import languageIconRuSrc from './images/language-icon-ru.svg';
import languageIconEnSrc from './images/language-icon-en.svg';

// localization
export const SUPPORTED_LOCALES = [{
  code: 'ru',
  title: 'Русский',
  iconSrc: languageIconRuSrc,
}, {
  code: 'en',
  title: 'English',
  iconSrc: languageIconEnSrc,
}];

class I18nService {
  constructor() {
    this._instance = i18n.createInstance(i18nOptions);
  }

  validateLanguageCode(code) {
    const isCodeValid = some(SUPPORTED_LOCALES, localeData => localeData.code === code);

    const output = isCodeValid ? code : DEFAULT_LANGUAGE_CODE;

    return output;
  }

  handleMissingKey = (key) => {
    // eslint-disable-next-line no-console
    console.warn(`Missing value for key ${key}`);

    return '';
  }

  init = (options) => {
    const languageCode = get(options, 'languageCode');
    const dictionary = get(options, 'dictionary', {});

    const output = this._instance.init({
      lng: languageCode,
      fallbackLng: DEFAULT_LANGUAGE_CODE,
      whitelist: SUPPORTED_LOCALES.map(locale => locale.code),
      resources: {
        [languageCode]: {
          [i18nOptions.defaultNS]: dictionary,
        },
      },
      parseMissingKeyHandler: this.handleMissingKey,
    });

    return output;
  }

  getLanguageCode = () => this._instance.language

  translate = (...args) => {
    const translation = trim(unescape(this._instance.t(...args)) || this._instance.t(...args));

    return translation;
  }

  translateHTML = (key, options) => {
    const translateOptions = isPlainObject(options)
      ? { ...options, ...INTERPOLATION_OPTIONS }
      : { ...INTERPOLATION_OPTIONS };
    const translation = this._instance.t(key, translateOptions);

    return translation;
  }
}

export default I18nService;
