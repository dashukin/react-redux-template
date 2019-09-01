import createSagaMiddleWare from 'redux-saga';
import { getSagaMiddleware } from '../saga.middleware';

jest.mock('redux-saga');

describe('getSagaMiddleware', () => {
  it('should create saga middleware with passed to context services', () => {
    const mockServices = {
      service: {},
    };
    const expectedCreateSagaMiddlewareArgs = {
      context: {
        services: mockServices,
      },
    };
    getSagaMiddleware({ services: mockServices });

    expect(createSagaMiddleWare).toHaveBeenCalledWith(expectedCreateSagaMiddlewareArgs);
  });
});
