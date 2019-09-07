import Api from '../index';
import { mockExampleApiResponse } from './mock/example-api.mock';

class ExampleApi extends Api {
  fetchExampleData = () => Promise.resolve(mockExampleApiResponse)
}

export default ExampleApi;
