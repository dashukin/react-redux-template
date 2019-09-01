import { applyMiddleware } from 'redux';
import {
  loggerMiddleware,
} from '../middleware';
import { createStoreMiddlewareEnhancer } from '../store.middleware';

jest.mock('redux');
jest.mock('../middleware');

describe('storeMiddleware', () => {
  it('should create store middleware enhancer', () => {
    const mockExtraMiddleware1 = jest.fn();
    const mockExtraMiddleware2 = jest.fn();
    const mockExtraMiddlewareList = [mockExtraMiddleware1, mockExtraMiddleware2];
    const mockApplyMiddlewareResult = jest.fn();

    applyMiddleware.mockReturnValue(mockApplyMiddlewareResult);

    const middlewareEnhancer = createStoreMiddlewareEnhancer(...mockExtraMiddlewareList);
    const expectedListOfMiddleware = [loggerMiddleware, ...mockExtraMiddlewareList];

    expect(applyMiddleware).toHaveBeenCalledWith(...expectedListOfMiddleware);
    expect(middlewareEnhancer).toEqual(mockApplyMiddlewareResult);
  });
});
