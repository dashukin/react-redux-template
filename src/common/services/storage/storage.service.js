import Store from 'store2';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import fpCloneDeep from 'lodash/fp/cloneDeep';

/**
 * @class Storage
 */
class Storage {
  constructor(props = {}) {
    const {
      namespace,
    } = props;

    this.storage = this.createStorage(namespace);
  }

  /**
   *
   * @param {String} namespace - store namespace to be used with every key stored
   */
  createStorage(namespace) {
    const isValidNamespace = isString(namespace) && !!namespace.length;
    const hasNoNamespace = typeof namespace === 'undefined';

    if (!isValidNamespace && !hasNoNamespace) {
      throw new Error(`Storage.createStore: ${typeof namespace} is not allowed type for namespace.`);
    }

    const clonedStore = fpCloneDeep(Store);

    const storage = isValidNamespace
      ? clonedStore.namespace(namespace)
      : clonedStore;

    return storage;
  }

  get(key) {
    return this.storage.get(key);
  }

  /**
   *
   * @param {String} key
   * @param {Array|Object|String|Null} value
   * @return {*}
   */
  set(key, value) {
    const result = isNil(value) || (isObject(value) && isEmpty(value))
      ? this.storage.remove(key)
      : this.storage.set(key, value);

    return result;
  }

  session(key, value) {
    return this.storage.session(key, value);
  }
}

export default Storage;
