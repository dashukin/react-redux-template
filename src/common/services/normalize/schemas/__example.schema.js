import { schema } from 'normalizr';
import isString from 'lodash/isString';
import cloneDeep from 'lodash/cloneDeep';

/**
 * @typedef {Object} RawExampleData
 *
 * @property {String} id
 * @property {String} mockValue
 */

/**
 * @typedef {Object} ExampleData
 *
 * @property {String} id
 * @property {String} value
 */

export default new schema.Entity('exampleData', {}, {
  idAttribute: 'id',
  processStrategy: (entity = {}) => {
    const exampleData = {};


    const { id, mockValue } = entity;

    // enforce string type
    exampleData.id = isString(id) ? id : `${id}`;
    exampleData.value = isString(mockValue) ? mockValue : `${mockValue}`;

    if (!PRODUCTION) {
      const rawData = cloneDeep(entity);
      exampleData.__raw = rawData;
    }

    return exampleData;
  },
});
