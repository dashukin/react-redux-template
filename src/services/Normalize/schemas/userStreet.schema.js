/*
* User streets schema
* */

import {schema}	from 'normalizr';
import findKey	from 'lodash/findKey';

const userStreetSchema = new schema.Entity('userStreets', {}, {
	processStrategy: (entity, parent, key) => {
		const id = findKey(parent, value => value === entity);

		entity.id = id;
		return entity;
	}
});

export default userStreetSchema;