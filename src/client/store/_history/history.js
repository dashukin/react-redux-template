/**
 * History
 * @see https://github.com/ReactTraining/history
 */

import { createBrowserHistory, createMemoryHistory } from 'history';

const historyConfig = {
  baseName: '',
  forceRefresh: false, // set to true when page reload is required
};

const history = !SSR ? createBrowserHistory(historyConfig) : createMemoryHistory(historyConfig);

export default history;
