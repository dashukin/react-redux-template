/*
* Product card schema
* */

import {schema} from 'normalizr';

const productCardSchema = new schema.Entity('product', {}, {
	processStrategy: (entity, parent, key) => {


		return entity;
	}
});

export default productCardSchema;