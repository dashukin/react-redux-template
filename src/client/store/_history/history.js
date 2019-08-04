/**
 * History
 * @see https://github.com/ReactTraining/history
 */

import { createBrowserHistory, createMemoryHistory } from 'history';

const historyConfig = {
  baseName: '',
  forceRefresh: false,
};

export const createClientHistory = () => createBrowserHistory(historyConfig);

export const createServerHistory = () => createMemoryHistory(historyConfig);

const history = !SSR ? createBrowserHistory(historyConfig) : createMemoryHistory(historyConfig);

export default history;
