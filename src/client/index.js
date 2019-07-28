import React from 'react';
import { hydrate } from 'react-dom';
import { ROOT_ELEMENT_ID } from 'config/application';
import get from 'lodash/get';

import { createAppStore } from './store/store';
import { createServices } from '../common/services';

import Root from './root.component';

export const createApp = ({ store, services }) => {
  const app = (
    <Root
      store={store}
      services={services}
    />
  );

  return app;
};

export const startApplication = async () => {
  const preloadedState = get(window, '__PRELOADED_STATE__', {});
  const services = createServices({
    location: window.location,
    cookie: document.cookie,
  });

  const appStore = await createAppStore({ services, initialState: preloadedState });
  const app = createApp({ store: appStore, services });

  hydrate(app, document.getElementById(ROOT_ELEMENT_ID));
};

if (typeof window !== 'undefined') {
  startApplication();
}
