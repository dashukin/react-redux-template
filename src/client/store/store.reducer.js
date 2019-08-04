import { combineReducers } from 'redux';
import page from 'src/client/store/pages/pages.reducer';
import example from 'src/client/store/__example/example.reducer';

const reducers = {
  page,
  example,
};

export const createCombinedReducers = extraReducers => (
  combineReducers({ ...reducers, ...extraReducers })
);
