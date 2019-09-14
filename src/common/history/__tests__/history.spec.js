import { createBrowserHistory, createMemoryHistory } from 'history';
import { createClientHistory, createServerHistory, historyConfig } from '../history';

jest.mock('history');

describe('history', () => {
  let mockBrowserHistory;
  let mockMemoryHistory;

  beforeEach(() => {
    mockBrowserHistory = {};
    mockMemoryHistory = {};
  });

  describe('createClientHistory', () => {
    it('should create browser history', () => {
      createBrowserHistory.mockReturnValue(mockBrowserHistory);
      const clientHistory = createClientHistory();

      expect(createBrowserHistory).toHaveBeenCalled();
      expect(clientHistory).toBe(mockBrowserHistory);
    });
  });

  describe('createServerHistory', () => {
    it('should create server history', () => {
      createMemoryHistory.mockReturnValue(mockMemoryHistory);
      const historyWithNoEntries = createServerHistory();

      expect(createMemoryHistory).toHaveBeenCalledWith(historyConfig);

      const mockEntryPath = '/initial-entry-path';
      createServerHistory({
        path: mockEntryPath,
      });

      expect(createMemoryHistory).toHaveBeenCalledWith({
        ...historyConfig,
        initialEntries: [mockEntryPath],
      });

      expect(historyWithNoEntries).toBe(mockMemoryHistory);
    });
  });
});
