/**
 * Product schema
 */

import {schema}				from 'normalizr';
import modificationSchema	from './modification.schema';
import toppingSchema		from './topping.schema';
import config				from 'src/config';
import isString				from 'lodash/isString';
import omit					from 'lodash/omit';
import sortBy				from 'lodash/sortBy';
import get					from 'lodash/get';
import forOwn				from 'lodash/forOwn';
import findKey				from 'lodash/findKey';


const productSchema = new schema.Entity('products', {
	modifications: [modificationSchema],
	toppings: [toppingSchema]
}, {
	processStrategy: (entity, parent, key) => {
		const productId = (findKey(parent, value => value === entity) || '').toLowerCase();
		const productCategory = get(entity, 'product_category');
		const productUrl = ['', productCategory, productId].join('/').toLowerCase();

		entity.id = productId;
		entity.url = productUrl;
		forOwn(entity.products, (modification, key) => {
			modification.id = (key + '').toLowerCase();
		});

		const {photo_big, photo_small} = entity;
		entity.photo_big = isString(photo_big) && photo_big.length ? config.MEDIA_BASE_URL + photo_big : '';
		entity.photo_small = isString(photo_small) ? config.MEDIA_BASE_URL + photo_small : '';

		const modifications = sortBy(entity.products, modification => {
			const priceValue = Number(get(modification, 'price', 0));
			return priceValue;
		});

		const newEntity = omit(entity, ['products']);

		newEntity.modifications = modifications;

		return newEntity;
	}
});

export default productSchema;