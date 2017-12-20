/**
 * Categories schema
 */

import {schema}	from 'normalizr';
import config	from 'src/config';
import isString	from 'lodash/isString';

const categoriesSchema = new schema.Entity('categories', {}, {
	processStrategy: (entity, parent, key) => {
		const {image_big, image_small} = entity;

		entity.image_big = isString(image_big) && image_big.length ? config.MEDIA_BASE_URL + image_big : '';
		entity.image_small = isString(image_small) && image_small.length ? config.MEDIA_BASE_URL + image_small : '';

		return entity;
	}
});

export default categoriesSchema;