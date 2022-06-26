require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { exit } = require('process');

// const config = require('./config');
// const D2API = require('./src/D2API');

// const app = new D2API({
//   key: config.appKey,
//   oauthConfig: {
//     id: config.oauth.clientId
//   }
// });

// app.db()
//   .then(() => {
const dbPath = path.resolve('./storage/current.json');
const bitsPath = path.resolve('./storage/db');
if (!fs.existsSync(bitsPath) || !fs.lstatSync(bitsPath).isDirectory()) {
  fs.mkdirSync(bitsPath);
}
try {
  const hugeDataObject = JSON.parse(fs.readFileSync(dbPath));
  Object.keys(hugeDataObject).forEach((key) => {
    // console.log(key);
    fs.writeFileSync(path.resolve(bitsPath, `${key}.json`), JSON.stringify(hugeDataObject[key]));
  });
} catch (err) {
  console.error(err);
  exit(0);
}
// })
// .catch(console.error);
