import React from 'react';
import { Route, Switch } from 'react-router-dom';
import fpMap from 'lodash/fp/map';

import HomePage from 'src/client/pages/home';

const routesConfig = [
	{
		key: 'home',
		path: '/',
		exact: true,
		component: HomePage
	}
]

const renderRoutes = fpMap(route => React.createElement(Route, { ...route }));

export const Routes = React.createElement(Switch, {}, renderRoutes(routesConfig));