import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as pages from './pages';
import DefaultPage from './pages';

class Application extends PureComponent {
  getPage() {
    const { page } = this.props;
    const PageComponent = pages[page] || DefaultPage;

    return (
      <PageComponent />
    );
  }

  render() {
    const page = this.getPage();

    return (
      <div>
        {page}
      </div>
    );
  }
}

Application.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Application;
