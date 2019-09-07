import pageConstants from '../page.constants';

describe('page.constants', () => {
  it('should match snapshot', () => {
    expect(pageConstants).toMatchSnapshot();
  });
});
