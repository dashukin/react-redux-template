import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_home.scss';

class HomePage extends PureComponent {
  render() {
    const { translate } = this.props;
    return (
      <div>
        {translate('app.homepage.title')}
        <p>Home page content</p>
      </div>
    );
  }
}

HomePage.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default HomePage;
