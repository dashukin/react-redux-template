import i18nConstants from './i18n.constants';

const {
  I18N_INIT_SUCCESS,
  I18N_LANGUAGE_CHANGE,
} = i18nConstants;

export const i18nInitSuccess = payload => ({
  type: I18N_INIT_SUCCESS,
  payload,
});

export const changeLanguage = payload => ({
  type: I18N_LANGUAGE_CHANGE,
  payload,
});
