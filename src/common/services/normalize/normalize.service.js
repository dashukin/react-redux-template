// eslint-disable-next-line no-unused-vars
import { normalize, denormalize } from 'normalizr';

import exampleSchema from './schemas/__example.schema';

export const normalizeExampleData = data => normalize(data, exampleSchema);
