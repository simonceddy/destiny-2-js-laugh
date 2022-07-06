require('dotenv').config();
const path = require('path');
const fs = require('fs');
const config = require('./config');
const D2API = require('./src/D2API');
const getDatabase = require('./src/util/getDatabase');
const InventoryItem = require('./src/models/InventoryItem');
const Manifest = require('./src/Manifest');
const { storeJsonFile, storagePath } = require('./src/util/storage');

const app = new D2API({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

app.getManifest()
  .then(async ({ Response }) => {
    if (Response.version !== new Manifest().version) {
      console.log('updating database');
      storeJsonFile(storagePath('manifest.json'), Response);
      await getDatabase(app)
        .then((filePath) => {
          if (!filePath) {
            console.log('oi wheres the db at');
          } else if (!fs.existsSync(filePath)) {
            console.error('File not found!', filePath);
          } else {
            fs.renameSync(filePath, path.resolve(__dirname, 'storage/current.db'));
            console.log('renamed to current.db');
          }
        })
        .catch(console.error);
    } else {
      console.log('database up to date');
    }
  })
  .then(async () => {
    // if (fs.existsSync('etc/players.csv')) {
    //   const players = fs.readFileSync('etc/players.csv').toString().split(',');
    //   getPlayersData(app, players)
    //     .then((data) => {
    //       if (!data) console.log('whoops!');
    //       const player = data['Jenova#2003'];
    //       const firstChar = player.profile.characterIds[0];
    //       if (firstChar) {
    //         getPlayerCharacter(app, player, firstChar)
    //           .then(async (res) => {
    //             const { items } = res.equipment && res.equipment.data
    //               ? res.equipment.data
    //               : [];
    //             const itemObjs = await Promise.all(items.map(async (i) => {
    //               // console.log(i);
    //               if (i.itemHash) {
    //                 const item = new InventoryItem(i.itemHash);
    //                 await item.populate();
    //                 return item;
    //               }
    //               return null;
    //             }));

    //             return itemObjs;
    //           })
    //           .then((items) => {
    //             console.log(items[2].name);
    //             // storeJsonFile(storagePath('testItem.json'), items[2]);
    //           });
    //       } else {
    //         console.log('no character found there matey');
    //       }
    //     });
    // }
    const fG = await new InventoryItem(614426548).populate();
    // console.log(fG);
    storeJsonFile(storagePath('testitem.json'), fG);
  })
  .catch(console.error);
