import forOwn from 'lodash/forOwn';

import pageReducer, { defaultState } from '../page.reducer';
import pageConstans from '../page.constants';

describe('pages.reducer', () => {
  describe('page default state', () => {
    it('should match snapshot', () => {
      expect(defaultState).toMatchSnapshot();
    });
  });

  describe('page transformation', () => {
    it('should return default state', () => {
      const page = pageReducer(undefined, {
        type: undefined,
      });

      expect(page).toBe(defaultState);
    });

    it('should return page listed in page constants', () => {
      forOwn(pageConstans, (value, key) => {
        const action = {
          type: key,
        };
        const page = pageReducer(undefined, action);

        expect(page).toEqual(value);
      });
    });
  });
});
