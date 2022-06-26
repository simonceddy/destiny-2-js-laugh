require('dotenv').config();
const config = require('./config');
const D2API = require('./src/D2API');

require('dotenv').config();

const app = new D2API({
  key: config.appKey,
  oauthConfig: {
    id: config.oauth.clientId
  }
});

app.db()
  .then(console.log)
  .catch(console.error);
