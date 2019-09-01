/*
* History middleware
* */

import { routerMiddleware } from 'react-router-redux';

export const createHistoryRouterMiddleware = history => routerMiddleware(history);
