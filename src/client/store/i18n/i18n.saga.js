import {
  call,
  getContext,
  takeLatest,
  put,
} from 'redux-saga/effects';

import { i18nInitSuccess } from './i18n.actions';
import i18nConstants from './i18n.constants';

const { I18N_LANGUAGE_CHANGE } = i18nConstants;

export function* initI18n() {
  try {
    const services = yield getContext('services');
    const { i18nApi, i18nService, cookieService } = services;
    const languageCode = cookieService.get('language');
    const i18nCode = i18nService.validateLanguageCode(languageCode);

    cookieService.set('language', i18nCode);

    const dictionary = yield call(i18nApi.fetchLocale, i18nCode);
    yield i18nService.init({
      languageCode: i18nCode,
      dictionary,
    });
    yield put(i18nInitSuccess({
      code: i18nCode,
    }));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function* changeLanguage(action) {
  const languageCode = action.payload;
  // consider moving window proxy services into services scope
  if (!SSR) {
    const services = yield getContext('services');
    const { i18nService, cookieService } = services;
    const i18nCode = i18nService.validateLanguageCode(languageCode);
    cookieService.set('language', i18nCode);
    window.location.reload(true);
  }
}

export function* watchI18n() {
  yield takeLatest(I18N_LANGUAGE_CHANGE, changeLanguage);
}
