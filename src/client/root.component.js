import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Application from './application.container';

class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  componentDidMount() {
    // handle common mount logic
  }

  render() {
    return (
      <Provider store={this.store}>
        <Application />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

export default Root;
