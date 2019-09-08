/*
* Actions
* */

import dbConstants from './db.constants';

const {
  DB_ADD,
} = dbConstants;

export const addToDB = payload => ({
  type: DB_ADD,
  payload,
});
