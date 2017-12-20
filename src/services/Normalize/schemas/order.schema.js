/*
* Orders history schema
* */

import {schema} from 'normalizr';
import findKey from 'lodash/findKey';

const ordersHistorySchema = new schema.Entity('ordersHistory', {}, {
	processStrategy: (entity, parent, key) => {
		const orderId = (findKey(parent, value => value === entity) || '').toLowerCase();

		entity.id = orderId;

		return entity;
	}
});

export default ordersHistorySchema;