/**
 * Modification schema
 */

import {schema} from 'normalizr';
import findKey from 'lodash/findKey';

const sizeMap = {
	'22': 'Пышная, 22',
	'30': 'Пышная, 30',
	'ITAL 30': 'Тонкая, 30',
	'CREM 30': 'Тонкая, сырный борт, 30',
	'36': 'Пышная, 36',
	'ITAL 36': 'Тонкая, 36',
	'CREM 36': 'Тонкая, сырный борт, 36'
};

const modificationSchema = new schema.Entity('modifications', {}, {
	processStrategy: (entity, parent, key) => {
		const productId = parent.id;
		const {size, size_unit, price} = entity;
		const sizeFormatted = `${(sizeMap.hasOwnProperty(size) ? sizeMap[size] : size)}${size_unit}`;
		const priceFormatted = `${price} руб`;

		entity.productId = productId;
		entity.size = {
			value: size,
			formatted: sizeFormatted
		};
		entity.price = {
			value: price,
			formatted: priceFormatted
		};
		return entity;
	}
});

export default modificationSchema;