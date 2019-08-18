const fse = require('fs-extra');
const path = require('path');
const map = require('lodash/fp/map');
const filter = require('lodash/fp/filter');
const compose = require('lodash/fp/compose');
const Terser = require('terser');

const INLINE_SCRIPTS_DIR = `${process.cwd()}/src/client/inline-scripts`;
const INLINE_SCRIPTS_SRC_DIR = `${INLINE_SCRIPTS_DIR}/src`;
const INLINE_SCRIPTS_DIST_DIR = `${INLINE_SCRIPTS_DIR}/compiled`;
const INLINE_SCRIPTS_DIST_FILE = `${INLINE_SCRIPTS_DIST_DIR}/inline-scripts.js`;

const filterFilesPaths = filter((entryPath) => {
  const isFile = fse.statSync(entryPath).isFile();

  return isFile;
});

const resolvePaths = map((entryPath) => {
  const resolvedPath = path.resolve(`${INLINE_SCRIPTS_SRC_DIR}/${entryPath}`);

  return resolvedPath;
});

const combineFilesContent = map((entryPath) => {
  const fileContent = fse.readFileSync(entryPath, 'utf-8');

  return fileContent;
});

const minifyFiles = map((fileContent) => {
  const result = Terser.minify(fileContent);
  if (result.error) {
    throw result.error;
  }
  return result.code;
});

/**
 *
 * @param {String[]} filesContent
 */
const writeFiles = (filesContent) => {
  const combinedContent = filesContent.join('\n');
  return combinedContent;
};

const getFilesContent = compose(
  writeFiles,
  minifyFiles,
  combineFilesContent,
  filterFilesPaths,
  resolvePaths,
);

const prepareInlineScripts = () => {
  const entries = fse.readdirSync(path.resolve(INLINE_SCRIPTS_SRC_DIR));

  const content = getFilesContent(entries);

  fse.writeFileSync(INLINE_SCRIPTS_DIST_FILE, content, 'utf-8');
};

module.exports = {
  prepareInlineScripts,
};
