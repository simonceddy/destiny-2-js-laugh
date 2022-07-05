require('dotenv').config();
// const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { destinyMembershipType } = require('node-destiny-2/lib/destiny-types');
const { exit } = require('process');
const { STORAGE_DIR } = require('./src/support/consts');
const database = require('./src/database');
const config = require('./config');
const D2API = require('./src/D2API');
const getDatabase = require('./src/util/getDatabase');
const getPlayerCharacter = require('./src/util/getPlayerCharacter');
const getPlayersData = require('./src/util/getPlayersData');
const InventoryItem = require('./src/models/InventoryItem');
const fetchManifest = require('./src/util/fetchManifest');
const Manifest = require('./src/Manifest');

// database.serialize(() => {
//   database.each('SELECT id, json FROM DestinyClassDefinition', (err, row) => {
//     if (err) console.error(err);
//     console.log({ ...row, json: JSON.parse(row.json) });
//   });
// });
// console.log(database);

const app = new D2API({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

console.log(new Manifest());
// console.log(new InventoryItem(101010));

// fetchManifest(app);

if (fs.existsSync('etc/players.csv')) {
  const players = fs.readFileSync('etc/players.csv').toString().split(',');
  getPlayersData(app, players)
    .then((data) => {
      if (!data) console.log('whoops!');
      const player = data['Jenova#2003'];
      const firstChar = player.profile.characterIds[0];
      if (firstChar) {
        getPlayerCharacter(app, player, firstChar)
          .then(async (res) => {
            const { items } = res.equipment && res.equipment.data
              ? res.equipment.data
              : [];
            const itemObjs = await Promise.all(items.map(async (i) => {
              console.log(i);
              if (i.itemHash) {
                const item = new InventoryItem(i.itemHash);
                await item.populate();
                return item;
              }
              return null;
            }));

            return itemObjs;
          })
          .then((items) => console.log(items[2].stats()));
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
