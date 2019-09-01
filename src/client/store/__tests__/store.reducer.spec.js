import { combineReducers } from 'redux';
import {
  reducers,
  createCombinedReducers,
} from '../store.reducer';

jest.mock('redux');

describe('store.reducer', () => {
  describe('reducers', () => {
    it('should match snapshot', () => {
      expect(reducers).toMatchSnapshot();
    });
  });

  describe('createCombinedReducers', () => {
    it('should combine store reducers with any extra reducers passed', () => {
      const mockExtraReducer1 = jest.fn();
      const mockExtraReducer2 = jest.fn();
      const mockExtraReducersMap = { mockExtraReducer1, mockExtraReducer2 };
      const expectedReducersArgument = {
        ...reducers,
        ...mockExtraReducersMap,
      };
      const expectedCombineReducersResult = jest.fn();
      combineReducers.mockReturnValue(expectedCombineReducersResult);

      const combinedReducers = createCombinedReducers(mockExtraReducersMap);

      expect(combineReducers).toHaveBeenCalledWith(expectedReducersArgument);
      expect(combinedReducers).toEqual(expectedCombineReducersResult);
    });
  });
});
