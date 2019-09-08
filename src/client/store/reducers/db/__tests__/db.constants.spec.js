import dbConstants from '../db.constants';

describe('db.constants', () => {
  it('should match snapshot', () => {
    expect(dbConstants).toMatchSnapshot();
  });
});
