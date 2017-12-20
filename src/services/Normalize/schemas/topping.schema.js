/**
 * Topping schema
 */

import {schema}	from 'normalizr';
import config	from 'src/config';
import findKey	from 'lodash/findKey';
import isString	from 'lodash/isString';

const toppingSchema = new schema.Entity('toppings', {}, {
	processStrategy: (entity, parent, key) => {
		const toppingKey = (findKey(parent[key], value => value === entity) || '').toLowerCase();
		const {photo} = entity;

		entity.id = toppingKey;
		entity.photo = isString(photo) && photo.length ? config.MEDIA_BASE_URL + photo : '';

		return entity;
	}
});

export default toppingSchema;