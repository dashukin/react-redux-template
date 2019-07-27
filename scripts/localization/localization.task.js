const parseCSV = require('csv-parse');
const fse = require('fs-extra');
const map = require('lodash/map');

const {
  DICTIONARY_SRC_FILE,
  DICTIONARY_DIST_DIR,
  DICTIONARY_KEY_HEADER,
  CONSOLE_GREEN,
} = require('./localization.constants');

function csvToRows(fileContent) {
  return new Promise((resolve, reject) => {
    parseCSV(fileContent, { relax_column_count: true }, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve(output);
    });
  });
}

const processDictionary = async function () {
  console.log(CONSOLE_GREEN, `processing dictionary...`);
  const taskStarted = Date.now();
  const dictionaryFile = await fse.readFile(DICTIONARY_SRC_FILE, { encoding: 'utf-8' });
  const rows = await csvToRows(dictionaryFile);
  const headers = rows.shift();
  const keyIndex = headers.indexOf(DICTIONARY_KEY_HEADER);
  const languageCodes = [...headers].splice(keyIndex + 1);

  const languageCodeIndexesMap = languageCodes.reduce((acc, languageCode) => {
    acc[languageCode] = headers.indexOf(languageCode);

    return acc;
  }, {});

  const dictionaries = languageCodes.reduce((acc, languageCode) => {
    acc[languageCode] = [];

    return acc;
  }, {});

  const filledDcitionaries = rows.reduce((acc, row) => {
    languageCodes.forEach(languageCode => {
      const languageCodeIndex = languageCodeIndexesMap[languageCode];
      const keyValue = row[keyIndex];
      const translationValue = row[languageCodeIndex];

      // skip empty rows/cells
      if (!keyValue || !translationValue) {
        return;
      }

      const dictionaryRow = `${keyValue}=${translationValue}`;

      acc[languageCode].push(dictionaryRow);
    });

    return acc;
  }, dictionaries);

  await Promise.all(map(filledDcitionaries, (values, languageCode) => {
    const dictionaryName = `${languageCode}.properties`;
    const dictionaryPath = `${DICTIONARY_DIST_DIR}/${dictionaryName}`;
    const dictionaryContent = values.join('\n');

    return new Promise((resolve, reject) => {
      fse.writeFile(dictionaryPath, dictionaryContent, (err) => {
        if (err) {
          reject(err);
        }
        console.log(CONSOLE_GREEN, `Dictionary ${dictionaryName} has been created`);
        resolve();
      });
    });
  }));

  const taskFinished = Date.now();
  const duration = taskFinished - taskStarted;

  console.log(CONSOLE_GREEN, `finished in ${duration}ms`);
};

const createDictionary = async () => {
  const watchMode = process.env.WATCH;

  if (watchMode === 'true') {
    await processDictionary();
    fse.watchFile(DICTIONARY_SRC_FILE, async (curr, prev) => {
      await processDictionary();
    });
  } else {
    await processDictionary();
  }
};

module.exports = createDictionary;