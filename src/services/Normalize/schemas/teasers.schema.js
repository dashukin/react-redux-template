/*
* Teasers schema
* */

import {schema}	from 'normalizr';
import config	from 'src/config';
import findKey	from 'lodash/findKey';
import isString	from 'lodash/isString';

const teaserSchema = new schema.Entity('teasers', {}, {
	processStrategy: (entity, parent, key) => {
		const id = findKey(parent, value => value === entity);
		const {image_big, image_small} = entity;

		entity.id = id;
		entity.image_big = isString(image_big) && image_big.length ? config.MEDIA_BASE_URL + image_big : '';
		entity.image_small = isString(image_small) && image_small.length ? config.MEDIA_BASE_URL + image_small : '';

		return entity;
	}
});

export default teaserSchema;