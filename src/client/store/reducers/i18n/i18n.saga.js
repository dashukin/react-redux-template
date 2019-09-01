import {
  call,
  getContext,
  takeLatest,
  put,
} from 'redux-saga/effects';

import {
  i18nInitSuccess,
  i18nInitError,
} from './i18n.actions';
import i18nConstants from './i18n.constants';

const { I18N_LANGUAGE_CHANGE } = i18nConstants;

export function* initI18n() {
  try {
    const services = yield getContext('services');
    const { i18nApi, i18nService, cookieService } = services;
    const languageCode = yield call(cookieService.get, 'language');
    const i18nCode = yield call(i18nService.validateLanguageCode, languageCode);

    yield call(cookieService.set, 'language', i18nCode);

    const dictionary = yield call(i18nApi.fetchLocale, i18nCode);
    yield call(i18nService.init, {
      languageCode: i18nCode,
      dictionary,
    });
    yield put(i18nInitSuccess({
      code: i18nCode,
    }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(i18nInitError(err.message));
  }
}

export function* changeLanguage(action) {
  const languageCode = action.payload;
  // consider moving window proxy services into services scope
  if (!SSR) {
    const services = yield getContext('services');
    const { i18nService, cookieService } = services;
    const i18nCode = yield call(i18nService.validateLanguageCode, languageCode);
    yield call(cookieService.set, 'language', i18nCode);
    window.location.reload(true);
  }
}

export function* watchI18n() {
  yield takeLatest(I18N_LANGUAGE_CHANGE, changeLanguage);
}
