const path = require('path');
const fs = require('fs');
const { STORAGE_DIR } = require('../../support/consts');

function storeJsonFile(filepath, content) {
  const parsed = typeof content !== 'string' ? JSON.stringify(content, null, 2) : content;
  const fullpath = path.resolve(filepath);
  try {
    fs.writeFileSync(fullpath, parsed);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function storePlayersData(content = []) {
  const players = {};
  content.map((player) => {
    if (player.membershipId) {
      players[player.membershipId] = player;
    }
    return player;
  });
  const filepath = path.resolve(STORAGE_DIR, 'players.json');
  return storeJsonFile(filepath, JSON.stringify(players, null, 2));
}

function getAllPlayers() {
  const filepath = path.resolve(STORAGE_DIR, 'players.json');
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath).toString());
  }
  return false;
}

function getPlayerData(id) {
  const filepath = path.resolve(STORAGE_DIR, 'players.json');
  if (fs.existsSync(filepath)) {
    const players = getAllPlayers();
    return players[id] || false;
  }
  return false;
}

const confirmStored = (stored) => console.log(stored ? 'Success' : 'Storage failed');

module.exports = {
  storeJsonFile,
  storePlayersData,
  getPlayerData,
  getAllPlayers,
  confirmStored
};
