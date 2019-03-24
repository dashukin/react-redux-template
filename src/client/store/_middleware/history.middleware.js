/*
* History _middleware
* */

import { routerMiddleware } from 'react-router-redux';
import history from '../_history';

export const historyMiddleware = routerMiddleware(history);
