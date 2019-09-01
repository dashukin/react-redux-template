import { testSaga } from 'redux-saga-test-plan';
import {
  changeLanguage,
  watchI18n,
} from '../i18n.saga';
import i18nConstants from '../i18n.constants';

const {
  I18N_LANGUAGE_CHANGE,
} = i18nConstants;

describe('i18n.saga', () => {
  describe('changeLanguage', () => {
    let initialSSR;
    let globalWindow;
    let mockCahangeLanguageAction;
    let mockWindowReload;
    let mockCookieServiceSet;
    let mockValidateLanguageCode;
    let mockI18nService;
    let mockCookieService;
    let mockServices;
    let mockLanguageCode;

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
      mockValidateLanguageCode = jest.fn();
      mockI18nService = {
        validateLanguageCode: mockValidateLanguageCode,
      };
      mockCookieService = {
        set: mockCookieServiceSet,
      };
      mockServices = {
        i18nService: mockI18nService,
        cookieService: mockCookieService,
      };
    });

    afterEach(() => {
      global.SSR = initialSSR;
      global.window = globalWindow;
    });

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
