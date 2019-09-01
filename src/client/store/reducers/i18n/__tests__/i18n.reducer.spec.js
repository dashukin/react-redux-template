import i18nReducer, {
  initialState,
} from '../i18n.reducer';

import i18nConstants from '../i18n.constants';

const {
  I18N_INIT_SUCCESS,
} = i18nConstants;

describe('i18n reducer', () => {
  describe('initial state', () => {
    it('should match snapshot', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  it(`should update code on ${I18N_INIT_SUCCESS} action`, () => {
    const mockI18nCode = 'test-code';
    const defaultState = i18nReducer(undefined, { type: undefined });

    expect(defaultState).toEqual(initialState);

    const updatedState = i18nReducer(defaultState, {
      type: I18N_INIT_SUCCESS,
      payload: {
        code: mockI18nCode,
      },
    });

    const expectedState = {
      ...defaultState,
      code: mockI18nCode,
    };
    expect(updatedState).toEqual(expectedState);
  });
});
