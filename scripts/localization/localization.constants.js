const path = require('path');

const DICTIONARY_DIR = path.resolve(__dirname, '../../src/common/locale');
const DICTIONARY_SRC_FILE = path.resolve(DICTIONARY_DIR, './src/dictionary.csv');
const DICTIONARY_DIST_DIR = path.resolve(DICTIONARY_DIR, './dictionary');
const DICTIONARY_KEY_HEADER = 'key';
const CONSOLE_GREEN = '\x1b[32m%s\x1b[0m';

module.exports = {
  DICTIONARY_SRC_FILE,
  DICTIONARY_DIST_DIR,
  DICTIONARY_KEY_HEADER,
  CONSOLE_GREEN,
};
