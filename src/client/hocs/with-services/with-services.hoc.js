import React from 'react';
import PropTypes from 'prop-types';

const {
  Provider: ReactServicesProvider,
  Consumer: ReactServicesConsumer,
} = React.createContext();

export const ServicesProvider = ({ children, services }) => (
  <ReactServicesProvider value={services}>
    {children}
  </ReactServicesProvider>
);

ServicesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  services: PropTypes.shape({}).isRequired,
};

export const withServices = (WrappedComponent) => {
  const WithServices = (props) => {
    const output = (
      <ReactServicesConsumer>
        {(services) => {
          const wrappedCompontnOutput = (
            <WrappedComponent
              {...props}
              services={services}
            />
          );

          return wrappedCompontnOutput;
        }}
      </ReactServicesConsumer>
    );

    return output;
  };

  WithServices.displayName = `WithServices(${WrappedComponent.name})`;

  return WithServices;
};
