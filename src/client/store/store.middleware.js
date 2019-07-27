import { applyMiddleware } from 'redux';
import {
  loggerMiddleware,
} from './_middleware';

export const createStoreMiddlewareEnhancer = (...extraMiddleware) => (
  applyMiddleware(
    loggerMiddleware,
    ...extraMiddleware,
  )
);
