/**
 * Normalizer
 */

import get					from 'lodash/get';

import {normalize}			from 'normalizr';
import productSchema		from './schemas/product.schema';
import categorySchema		from './schemas/category.schema';
import teaserSchema			from './schemas/teasers.schema';
import orderSchema			from './schemas/order.schema';
import userStreetSchema		from './schemas/userStreet.schema';

const normalizeProducts = data => {
	return normalize(data, [productSchema]);
};

const normalizeProductsCategories = data => {
	return normalize(data, [categorySchema]);
};

const normalizeTeaser = data => {
	return normalize(data, [teaserSchema]);
};

const normalizeCategoryCard = category => {
	const title = get(category, 'description', '');
	const image = get(category, 'image_big', '') || get(category, 'image_small', '');
	const name = get(category, 'name', '').toLowerCase();
	const url = ['', name].join('/');

	return {
		title,
		image,
		name,
		url
	}
};

const normalizeOrdersHistory = data => {
	return normalize(data, [orderSchema]);
};

const normalizeProductCard = ({product, modifications, toppings}) => {

	const productToppingsKeys = get(product, 'toppings', []);
	const productModificationsKeys = get(product, 'modifications', []);

	// create product toppings description
	const productToppingsName = productToppingsKeys.map(toppingKey => {
		const toppingEntity = toppings[toppingKey];
		const toppingName = toppingEntity.name;

		return toppingName;
	});
	const productDescription = productToppingsName.join(', ');

	const productModificationsData = productModificationsKeys.map(modificationKey => {
		const modificationEntity = modifications[modificationKey];
		const modificationId = modificationEntity.id;
		const modificationName = get(modificationEntity, 'size.formatted', '');
		const modificationPrice = get(modificationEntity, 'price.formatted', '');

		return {
			id: modificationId,
			name: modificationName,
			price: modificationPrice
		}
	});

	const productData = {
		id: product.id,
		title: product.name,
		image: product.photo_big,
		description: productDescription,
		modifications: productModificationsData
	};

	return productData;
};

const normalizeUserStreets = (streets) => {
	return normalize(streets, [userStreetSchema]);
}

export {
	normalizeProducts,
	normalizeProductsCategories,
	normalizeTeaser,
	normalizeCategoryCard,
	normalizeProductCard,
	normalizeOrdersHistory,
	normalizeUserStreets
};