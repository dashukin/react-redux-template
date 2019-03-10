/*
* Routing service to manage manual redirects
* */

import store from 'src/client/store/store';
import {push} from 	'react-router-redux';

const routes = {
	orders: '/user/order_history'
};

class RoutingService {

	constructor () {

	}

	/**
	 * Navigate to given route
	 * @param url {String}
	 */
	navigateTo = (url) => {
		store.dispatch(push(url));
	}

	goToOrders = () => {
		const route = routes.orders;

		this.navigateTo(route);
	}

}

export default new RoutingService();

