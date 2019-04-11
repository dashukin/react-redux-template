import { combineReducers } from 'redux';
import page from 'src/client/store/pages/pages.reducer';

const reducers = {
  page,
};

export const createCombinedReducers = extraReducers => (
  combineReducers({ ...reducers, ...extraReducers })
);
