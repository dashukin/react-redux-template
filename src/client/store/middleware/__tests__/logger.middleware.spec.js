import Logger from 'src/common/utils/logger';
import * as applicationConfig from 'config/application';
import { loggerMiddleware } from '../logger.middleware';

jest.mock('src/common/utils/logger');
jest.mock('config/application');

describe('logger.middleware', () => {
  let mockInfo;
  let mockNext;

  beforeEach(() => {
    mockInfo = jest.fn();
    mockNext = jest.fn();

    Logger.mockReset();
    Logger.mockImplementation(() => ({
      info: mockInfo,
    }));
  });

  it('should log actions passed to middleware when LOG_ACTIONS_ENABLED is true', () => {
    applicationConfig.LOG_ACTIONS_ENABLED = true;

    const middleware = loggerMiddleware()(mockNext);
    const mockAction = {
      type: 'mock-action',
    };
    middleware(mockAction);

    expect(mockInfo).toHaveBeenCalledWith(mockAction);
    expect(mockNext).toHaveBeenCalledWith(mockAction);
  });

  it('should NOT log actions passed to middleware when LOG_ACTIONS_ENABLED is false', () => {
    applicationConfig.LOG_ACTIONS_ENABLED = false;

    const middleware = loggerMiddleware()(mockNext);
    const mockAction = {
      type: 'mock-action',
    };
    middleware(mockAction);

    expect(mockInfo).not.toHaveBeenCalledWith(mockAction);
    expect(mockNext).toHaveBeenCalledWith(mockAction);
  });
});
