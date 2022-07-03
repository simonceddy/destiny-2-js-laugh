require('dotenv').config();
const fs = require('fs');
const { destinyMembershipType } = require('node-destiny-2/lib/destiny-types');
const path = require('path');
const config = require('./config');
const D2API = require('./src/D2API');
const getDatabase = require('./src/util/getDatabase');
const getPlayerCharacter = require('./src/util/getPlayerCharacter');
const getPlayersData = require('./src/util/getPlayersData');

const app = new D2API({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

if (fs.existsSync('etc/players.csv')) {
  const players = fs.readFileSync('etc/players.csv').toString().split(',');
  getPlayersData(app, players)
    .then((data) => {
      if (!data) console.log('whoops!');
      const player = data['Sultan Vinegar#2437'];
      const firstChar = player.profile.characterIds[1];
      if (firstChar) {
        getPlayerCharacter(app, player, firstChar)
          .then((res) => {
            const { items } = res.equipment && res.equipment.data
              ? res.equipment.data
              : [];
            return Promise.all(items.map((i) => {
              console.log(i);
              return i;
            }));
          })
          .then(console.log);
      } else {
        console.log('no character found there matey');
      }
    });
}

// getDatabase(app, (filePath) => {
//   if (!filePath) {
//     console.log('oi wheres the db at');
//   } else if (!fs.existsSync(filePath)) {
//     console.error('File not found!', filePath);
//   } else {
//     fs.renameSync(filePath, path.resolve(__dirname, 'storage/current.db'));
//     console.log('renamed to current.db');
//   }
// })
//   .catch(console.error);
