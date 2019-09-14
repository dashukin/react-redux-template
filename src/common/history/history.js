/**
 * History
 * @see https://github.com/ReactTraining/history
 */

import { createBrowserHistory, createMemoryHistory } from 'history';

export const historyConfig = {
  baseName: '',
  forceRefresh: false,
};

export const createClientHistory = () => createBrowserHistory(historyConfig);

export const createServerHistory = ({ path } = {}) => {
  const initialEntriesArgument = path ? {
    initialEntries: [path],
  } : {};

  const history = createMemoryHistory({
    ...historyConfig,
    ...initialEntriesArgument,
  });

  return history;
};
