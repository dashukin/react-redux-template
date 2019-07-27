import get from 'lodash/get';
import i18nConstants from './i18n.constants';

const {
  I18N_INIT_SUCCESS,
} = i18nConstants;

const initialState = {
  code: undefined,
};

const i18n = (state = initialState, action) => {
  switch (action.type) {
    case I18N_INIT_SUCCESS: {
      const languageCode = get(action.payload, 'code');

      return { ...state, code: languageCode };
    }
    default: {
      return state;
    }
  }
};

export default i18n;
