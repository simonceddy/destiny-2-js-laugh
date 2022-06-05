require('dotenv').config();
const D2 = require('node-destiny-2');
const config = require('./config');
const getPlayerCharacter = require('./src/characters/getPlayerCharacter');
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
