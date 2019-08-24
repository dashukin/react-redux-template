import React from 'react';
import { hydrate } from 'react-dom';
import { ROOT_ELEMENT_ID } from 'config/application';
import get from 'lodash/get';

import { createAppStore } from 'src/client/store/store';
import { createServices } from 'src/common/services';

import inlineScripts from 'src/client/inline-scripts/compiled/inline-scripts';

import Root from './root.component';

export const createApp = ({ store, services }) => {
  const app = (
    <Root
      store={store}
      services={services}
      inlineScripts={inlineScripts}
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
