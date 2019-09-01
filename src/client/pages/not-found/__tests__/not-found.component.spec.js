import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../not-found.component';

describe('Not found page', () => {
  it('should match NotFoundPage snapshot', () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
