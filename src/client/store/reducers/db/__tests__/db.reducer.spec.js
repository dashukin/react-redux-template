import dbReducer, { initialState } from '../db.reducer';
import {
  addToDB,
} from '../db.actions';

describe('db.reducer', () => {
  describe('initial state', () => {
    it('should return default state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('db transformations', () => {
    it('should return default state WHEN initial state is not passed', () => {
      const mockFakeAction = {
        type: 'example',
      };
      const reducedState = dbReducer(undefined, mockFakeAction);

      expect(reducedState).toBe(initialState);
    });

    it('should add data to db WHEN no existing key is presented', () => {
      const mockData = {
        test: true,
      };
      const mockKey = 'test-key';
      const mockAction = addToDB({
        key: mockKey,
        data: mockData,
      });
      const reducedState = dbReducer(undefined, mockAction);
      const expectedState = {
        ...initialState,
        [mockKey]: mockData,
      };

      expect(reducedState).toEqual(expectedState);
    });

    it('should merge data under existing key', () => {
      const mockExistingKey = 'existing-key';
      const mockExistingData = {
        existingData: true,
      };
      const mockNewData = {
        newData: true,
      };
      const mockInitialState = {
        [mockExistingKey]: mockExistingData,
      };
      const expectedState = {
        ...initialState,
        [mockExistingKey]: {
          ...mockExistingData,
          ...mockNewData,
        },
      };
      const mockAction = addToDB({
        key: mockExistingKey,
        data: mockNewData,
      });

      const reducedState = dbReducer(mockInitialState, mockAction);

      expect(reducedState).toEqual(expectedState);
    });
  });
});
