require('dotenv').config();
const D2 = require('node-destiny-2');
const config = require('./config');
const playerBuilder = require('./src/players/playerBuilder');
const { getPlayerData } = require('./src/util/storage');

const app = new D2({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

const data = getPlayerData('4611686018522414129');

playerBuilder(app, data)
  .then((player) => player
    .getCharacter(player.characterIds[1])
    .then((c) => console.log(c)))
  .catch(console.error);
