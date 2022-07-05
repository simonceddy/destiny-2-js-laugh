const path = require('path');
const fs = require('fs');
const { STORAGE_DIR } = require('../../support/consts');

/**
 * Convenience method for path.resolve in storage dir
 * @param {string} filepath Filepath relative to storage dir
 * @returns {string} resolved path to file
 */
function storagePath(filepath) {
  return path.resolve(STORAGE_DIR, filepath);
}

/**
 * Persist a json file to filesystem.
 * @param {string} filepath Full filepath
 * @param {*} content File content to be
 * @returns {boolean} True if successful and false/untrue if not.
 */
function storeJsonFile(filepath, content) {
  const parsed = typeof content !== 'string'
    ? JSON.stringify(content, null, 2)
    : content;
  const fullpath = path.resolve(filepath);
  try {
    fs.writeFileSync(fullpath, parsed);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const confirmStored = (stored) => console.log(stored ? 'Success' : 'Storage failed');

module.exports = {
  storeJsonFile,
  storagePath,
  confirmStored
};
