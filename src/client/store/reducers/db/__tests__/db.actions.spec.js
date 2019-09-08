import {
  addToDB,
} from '../db.actions';
import dbConstants from '../db.constants';

const {
  DB_ADD,
} = dbConstants;

describe('db.actions', () => {
  it(`should return action with ${DB_ADD} action type and passed payload`, () => {
    const mockPayload = 'test-payload';
    const expectedAction = {
      type: DB_ADD,
      payload: mockPayload,
    };
    const action = addToDB(mockPayload);

    expect(action).toEqual(expectedAction);
  });

  it(`should return action with ${DB_ADD} action type and undefined payload`, () => {
    const expectedAction = {
      type: DB_ADD,
      payload: undefined,
    };
    const action = addToDB();

    expect(action).toEqual(expectedAction);
  });
});
