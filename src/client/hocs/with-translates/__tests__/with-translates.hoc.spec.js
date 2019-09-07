import React from 'react';
import { mount } from 'enzyme';
import { ServicesProvider } from '../../with-services';
import { withTranslates } from '../with-translates.hoc';

describe('with-translates.hoc', () => {
  let mockServices;
  let mockI18nService;
  let mockTranslate;
  let mockTranslateHTML;
  let mockGetLanguageCode;

  beforeEach(() => {
    mockTranslate = jest.fn();
    mockTranslateHTML = jest.fn();
    mockTranslateHTML = jest.fn();
    mockI18nService = {
      translate: mockTranslate,
      translateHTML: mockTranslateHTML,
      getLanguageCode: mockGetLanguageCode,
    };
    mockServices = {
      i18nService: mockI18nService,
    };
  });

  describe('withTranslates', () => {
    it('should pass translation functions into child component', () => {
      const ChildComponent = () => 'Child component';
      const WrappedComponent = withTranslates(ChildComponent);
      const component = (
        <ServicesProvider services={mockServices}>
          <WrappedComponent />
        </ServicesProvider>
      );
      const wrapper = mount(component);

      expect(wrapper.find(ChildComponent).prop('translate')).toBe(mockTranslate);
      expect(wrapper.find(ChildComponent).prop('translateHTML')).toBe(mockTranslateHTML);
      expect(wrapper.find(ChildComponent).prop('getLanguageCode')).toBe(mockGetLanguageCode);
    });
  });
});
