import {
  i18nInitSuccess,
  i18nInitError,
  i18nChangeLanguage,
} from '../i18n.actions';
import i18nConstants from '../i18n.constants';

const {
  I18N_INIT_SUCCESS,
  I18N_INIT_ERROR,
  I18N_LANGUAGE_CHANGE,
} = i18nConstants;

describe('i18n.actions', () => {
  it('should create action for successfull i18n initialization', () => {
    const expected = {
      type: I18N_INIT_SUCCESS,
    };

    expect(i18nInitSuccess()).toEqual(expected);
  });

  it('should create action for i18n initialization error', () => {
    const mockErrorPayload = 'mock-error';
    const expected = {
      type: I18N_INIT_ERROR,
      payload: mockErrorPayload,
    };

    expect(i18nInitError(mockErrorPayload)).toEqual(expected);
  });

  it('should create action for i18n change language', () => {
    const mockChangeLanguagePayload = 'mock-payload';
    const expected = {
      type: I18N_LANGUAGE_CHANGE,
      payload: mockChangeLanguagePayload,
    };

    expect(i18nChangeLanguage(mockChangeLanguagePayload)).toEqual(expected);
  });
});
