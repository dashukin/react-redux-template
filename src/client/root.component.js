import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReactReduxProvider } from 'react-redux';
import { ServicesProvider } from './hocs/with-services';
import Application from './application.container';

class Root extends PureComponent {
  componentDidMount() {
    // handle common mount logic
  }

  render() {
    const { store, services } = this.props;
    return (
      <ReactReduxProvider store={store}>
        <ServicesProvider services={services}>
          <Application />
        </ServicesProvider>
      </ReactReduxProvider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  services: PropTypes.shape({}).isRequired,
};

export default Root;
