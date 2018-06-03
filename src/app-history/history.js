/*
* Application history
* */

import createHistory from 'history/createBrowserHistory';
// import routing dependencies
import {routerMiddleware} from 'react-router-redux';

export const history = createHistory();

export const historyMiddleWare = routerMiddleware(history);
