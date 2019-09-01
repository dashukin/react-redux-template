import i18nConstants from '../i18n.constants';

describe('i18n constants', () => {
  it('should match snapshot', () => {
    expect(i18nConstants).toMatchSnapshot();
  });
});
