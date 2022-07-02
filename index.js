require('dotenv').config();
const fs = require('fs');
const path = require('path');
const config = require('./config');
const D2API = require('./src/D2API');
const getDatabase = require('./src/util/getDatabase');

const app = new D2API({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

getDatabase(app, (filePath) => {
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
