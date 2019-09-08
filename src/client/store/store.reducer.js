import { combineReducers } from 'redux';
import db from 'src/client/store/reducers/db/db.reducer';
import page from 'src/client/store/reducers/page/page.reducer';
import example from 'src/client/store/__example/example.reducer';

export const reducers = {
  db,
  page,
  example,
};

export const createCombinedReducers = extraReducers => (
  combineReducers({ ...reducers, ...extraReducers })
);
