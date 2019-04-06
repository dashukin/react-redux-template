import React from 'react';
import { hydrate } from 'react-dom';
import get from 'lodash/get';

import { ROOT_ELEMENT_ID } from 'config/application';
import { createAppStore } from './store/store';
import Root from './root.component';

export const startApplication = () => {
	const preloadedState = get(window, '__PRELOADED_STATE__', {});

	createAppStore()(preloadedState)
		.then((store) => {
			const root = (
				<Root store={store} />
			);

			hydrate(root, document.getElementById(ROOT_ELEMENT_ID))
		});
}

startApplication();