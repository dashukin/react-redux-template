import { schema } from 'normalizr';
import cloneDeep from 'lodash/cloneDeep';

export default new schema.Entity('example', {}, {
  idAttribute: 'id',
  processStrategy: (entity) => {
    const rawData = cloneDeep(entity);
    const data = {};

    // development mode debugging
    if (!PRODUCTION) {
      data.__raw = rawData;
    }

    return data;
  },
});
