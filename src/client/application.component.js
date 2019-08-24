import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as pages from 'src/client/pages';
import DefaultPage from './pages';

import './application.scss';

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
      <div className="application">
        {page}
      </div>
    );
  }
}

Application.propTypes = {
  page: PropTypes.string,
};

Application.defaultProps = {
  page: '',
};

export default Application;
