/**
 * Saga middleware
 */

import createSagaMiddleWare from 'redux-saga';

export const getSagaMiddleware = ({ services }) => createSagaMiddleWare({
  context: {
    services,
  },
});
