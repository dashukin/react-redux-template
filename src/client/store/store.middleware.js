import { applyMiddleware } from 'redux';
import {
  loggerMiddleware,
} from './middleware';

export const createStoreMiddlewareEnhancer = (...extraMiddleware) => (
  applyMiddleware(
    loggerMiddleware,
    ...extraMiddleware,
  )
);
