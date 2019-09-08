/*
* Reducer
* */

import dbConstants from './db.constants';

const {
  DB_ADD,
} = dbConstants;

export const initialState = Object.freeze({});

const db = (state = initialState, action) => {
  switch (action.type) {
    case DB_ADD: {
      const {
        key,
        data,
      } = action.payload;

      const originalData = state[key] || {};

      const output = {
        ...initialState,
        [key]: {
          ...originalData,
          ...data,
        },
      };

      return { ...state, ...output };
    }

    default:
      return state;
  }
};

export default db;
