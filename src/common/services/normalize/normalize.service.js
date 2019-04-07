import { normalize, denormalize } from 'normalizr';

import exampleSchema from './schemas/__example.schema';

export const normalizeExampleData = (data) => {
	return normalize(data, exampleSchema);
};