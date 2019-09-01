import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../home.component';

describe('Home page', () => {
  const mockTranslate = jest.fn(value => value);
  it('should render Home page', () => {
    const wrapper = shallow(<HomePage translate={mockTranslate} />);

    expect(wrapper).toMatchSnapshot();
  });
});
