import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  ServicesProvider, withServices,
} from '../with-services.hoc';

describe('with-services.hoc', () => {
  let mockServices;

  beforeEach(() => {
    mockServices = {};
  });

  describe('ServicesProvider', () => {
    it('should match snapshot', () => {
      const component = (
        <ServicesProvider services={mockServices}>Children</ServicesProvider>
      );
      const wrapper = shallow(component);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('withServices', () => {
    it('should pass services to child component', () => {
      const ChildComponent = () => 'Child component';
      const WrappedComponent = withServices(ChildComponent);

      const component = (
        <ServicesProvider services={mockServices}>
          <WrappedComponent />
        </ServicesProvider>
      );

      const wrapper = mount(component);

      expect(wrapper.find(ChildComponent).prop('services')).toBe(mockServices);
    });
  });
});
