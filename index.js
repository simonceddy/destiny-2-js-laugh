require('dotenv').config();
const D2 = require('node-destiny-2');
const config = require('./config');
const getPlayerCharacter = require('./src/characters/getPlayerCharacter');
const playerBuilder = require('./src/players/playerBuilder');
const { getAllPlayers } = require('./src/util/storage');

// init Destiny2API
const app = new D2({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

// Load player data from persistance
const data = Object.values(getAllPlayers())[0];

// build player object and do some stuff
playerBuilder(app, data)
  .then((player) => getPlayerCharacter(app, player, player.characterIds[1])
    .then((c) => {
      if (c) {
        const i = c.getEquipment().items[0];
        app.getItem(
          player.membershipType,
          player.membershipId,
          i.itemInstanceId,
          [300]
        )
          .then((r) => console.log(r.Response));
      }
    }))
  .catch(console.error);
