import React from 'react';
import { shallow } from 'enzyme';
import Application from 'src/client/application.component';
import { NOT_FOUND } from 'redux-first-router';
import HomePage from 'src/client/pages/home';
import NotFoundPage from 'src/client/pages/not-found';

const homePage = 'HomePage';
const notFoundPage = 'NotFoundPage';

describe('application.component', () => {
  it('should render Home page as a default one', () => {
    const wrapper = shallow(<Application />);

    expect(wrapper.find(HomePage).length).toBe(1);
  });

  it('should render Home page WHEN appropriate page property is passed', () => {
    const wrapper = shallow(<Application />);

    expect(wrapper.find(HomePage).length).toBe(1);
  });

  it('should render page not found WHEN when appropriate page property is passed', () => {
    const wrapper = shallow(<Application page={notFoundPage} />);

    expect(wrapper.find(NotFoundPage).length).toBe(1);
  });

  describe('application.component snapshots', () => {
    it('should match snapshot with Home page as default one', () => {
      const wrapper = shallow(<Application />);

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with Home page', () => {
      const wrapper = shallow(<Application page={homePage} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with Not Found page', () => {
      const wrapper = shallow(<Application page={NOT_FOUND} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
