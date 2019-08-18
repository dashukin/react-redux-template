import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Raw file content.
 * @see webpack configuration
 */
import inlineScripts from 'src/client/inline-scripts/compiled/inline-scripts';


import * as pages from './pages';
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
        <script dangerouslySetInnerHTML={{ __html: inlineScripts }} />
        {page}
      </div>
    );
  }
}

Application.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Application;
