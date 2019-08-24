import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReactReduxProvider } from 'react-redux';

import { ServicesProvider } from './hocs/with-services';
import Application from './application.container';

class Root extends PureComponent {
  componentDidMount() {
    // handle common mount logic
  }

  render() {
    const { store, services, inlineScripts } = this.props;
    return (
      <Fragment>
        {Boolean(inlineScripts) && (
          <script dangerouslySetInnerHTML={{ __html: inlineScripts }} />
        )}
        <ReactReduxProvider store={store}>
          <ServicesProvider services={services}>
            <Application />
          </ServicesProvider>
        </ReactReduxProvider>
      </Fragment>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  services: PropTypes.shape({}).isRequired,
  inlineScripts: PropTypes.string,
};

Root.defaultProps = {
  inlineScripts: '',
};

export default Root;
