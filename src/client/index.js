import React from 'react';
import { hydrate } from 'react-dom';
import { ROOT_ELEMENT_ID } from 'config/application';
import get from 'lodash/get';

import { createAppStore } from './store/store';
import { createServices } from '../common/services';

import Root from './root.component';

export const startApplication = () => {
  const preloadedState = get(window, '__PRELOADED_STATE__', {});
  const services = createServices({
    location: window.location,
    cookie: document.cookie,
  });

  createAppStore({ services })(preloadedState)
    .then((store) => {
      const root = (
        <Root
          store={store}
          services={services}
        />
      );

      hydrate(root, document.getElementById(ROOT_ELEMENT_ID));
    });
};

startApplication();
