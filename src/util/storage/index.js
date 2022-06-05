const path = require('path');
const fs = require('fs');
const { STORAGE_DIR } = require('../../support/consts');

/**
 * Convenience method for path.resolve in storage dir
 * @param {string} filepath Filepath relative to storage dir
 * @returns {string} resolved path to file
 */
function fromStorage(filepath) {
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

/**
 * Read and parse a json file.
 * @param {string} filepath Fully resolved path to file
 * @returns {*} Returns the parsed file contents or false if file not found.
 */
function loadJsonFile(filepath) {
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath).toString());
  }
  return false;
}

function storePlayersData(content = []) {
  const players = {};
  content.map((player) => {
    if (player.membershipId) {
      players[player.membershipId] = player;
    }
    return player;
  });
  const filepath = fromStorage('players.json');
  return storeJsonFile(filepath, JSON.stringify(players, null, 2));
}

function getAllPlayers() {
  return loadJsonFile(fromStorage('players.json'));
}

function getPlayerData(id) {
  const filepath = fromStorage('players.json');
  if (fs.existsSync(filepath)) {
    const players = getAllPlayers();
    return players[id] || false;
  }
  return false;
}

const confirmStored = (stored) => console.log(stored ? 'Success' : 'Storage failed');

function getManifest() {
  return loadJsonFile(fromStorage('manifest.json'));
}

module.exports = {
  loadJsonFile,
  storeJsonFile,
  storePlayersData,
  getPlayerData,
  getAllPlayers,
  confirmStored,
  getManifest,
};
