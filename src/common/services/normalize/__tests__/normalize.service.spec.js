import { normalize } from 'normalizr';

import {
  normalizeExampleData,
} from '../normalize.service';
import exampleSchema from '../schemas/__example.schema';

jest.mock('normalizr');

describe('normalize.service', () => {
  describe('normalizeExampleData', () => {
    it('should run normalize with predefined schema', () => {
      const exampleData = {};
      normalizeExampleData(exampleData);

      expect(normalize).toHaveBeenCalledWith(exampleData, exampleSchema);
    });
  });
});
