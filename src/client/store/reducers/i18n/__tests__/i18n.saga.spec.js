import { testSaga } from 'redux-saga-test-plan';
import {
  initI18n,
  changeLanguage,
  watchI18n,
} from '../i18n.saga';
import {
  i18nInitSuccess,
  i18nInitError,
} from '../i18n.actions';
import i18nConstants from '../i18n.constants';

const {
  I18N_LANGUAGE_CHANGE,
} = i18nConstants;

describe('i18n.saga', () => {
  let initialSSR;
  let globalWindow;
  let mockCahangeLanguageAction;
  let mockWindowReload;
  let mockCookieServiceSet;
  let mockCookieServiceGet;
  let mockValidateLanguageCode;
  let mockI18nService;
  let mockCookieService;
  let mockServices;
  let mockLanguageCode;
  let mockI18nApi;
  let mockI18nInit;
  let mockI18nFetchLocale;
  let mockI18nDictionary;

  beforeEach(() => {
    initialSSR = global.SSR;
    globalWindow = global.window;
    mockLanguageCode = 'en';
    mockCahangeLanguageAction = {
      type: I18N_LANGUAGE_CHANGE,
      payload: mockLanguageCode,
    };
    mockWindowReload = jest.fn();
    mockCookieServiceSet = jest.fn();
    mockCookieServiceGet = jest.fn();
    mockValidateLanguageCode = jest.fn();
    mockI18nFetchLocale = jest.fn();
    mockI18nInit = jest.fn();
    mockI18nService = {
      init: mockI18nInit,
      validateLanguageCode: mockValidateLanguageCode,
    };
    mockCookieService = {
      get: mockCookieServiceGet,
      set: mockCookieServiceSet,
    };
    mockI18nApi = {
      fetchLocale: mockI18nFetchLocale,
    };
    mockServices = {
      i18nApi: mockI18nApi,
      i18nService: mockI18nService,
      cookieService: mockCookieService,
    };
    mockI18nDictionary = {};
  });

  afterEach(() => {
    global.SSR = initialSSR;
    global.window = globalWindow;
  });

  describe('initI18n', () => {
    it('should fetch i18n dictionary', () => {
      testSaga(initI18n)
        .next()
        .getContext('services')
        .next(mockServices)
        .call(mockCookieServiceGet, 'language')
        .next(mockLanguageCode)
        .call(mockValidateLanguageCode, mockLanguageCode)
        .next(mockLanguageCode)
        .call(mockCookieServiceSet, 'language', mockLanguageCode)
        .next()
        .call(mockI18nFetchLocale, mockLanguageCode)
        .next(mockI18nDictionary)
        .call(mockI18nInit, {
          languageCode: mockLanguageCode,
          dictionary: mockI18nDictionary,
        })
        .next()
        .put(i18nInitSuccess({
          code: mockLanguageCode,
        }))
        .next()
        .isDone();
    });

    it('should handle error', () => {
      const mockErrorMessage = 'initI18n error';
      const mockError = new Error(mockErrorMessage);
      testSaga(initI18n)
        .next()
        .throw(mockError)
        .put(i18nInitError(mockErrorMessage))
        .next()
        .isDone();
    });
  });

  describe('changeLanguage', () => {
    it('should perform change language logic WHEN not on SSR', () => {
      global.SSR = false;
      global.window = {
        location: {
          reload: mockWindowReload,
        },
      };

      testSaga(changeLanguage, mockCahangeLanguageAction)
        .next()
        .getContext('services')
        .next(mockServices)
        .call(mockI18nService.validateLanguageCode, mockLanguageCode)
        .next(mockLanguageCode)
        .call(mockCookieServiceSet, 'language', mockLanguageCode)
        .next()
        .isDone();
    });

    it('should do nothing when on SSR', () => {
      global.SSR = true;

      testSaga(changeLanguage, mockCahangeLanguageAction)
        .next()
        .isDone();
    });
  });

  describe('watchI18n', () => {
    it('should run watchI18n saga', () => {
      testSaga(watchI18n)
        .next()
        .takeLatest(I18N_LANGUAGE_CHANGE, changeLanguage)
        .next()
        .isDone();
    });
  });
});
