const {
  storeJsonFile, confirmStored, storePlayersData, getAllPlayers
} = require('../util/storage');

function fetchManifest(app) {
  app.getManifest()
    .then((res) => {
      if (res.Response) {
        return storeJsonFile('./storage/manifest.json', res.Response);
      }
      return false;
    })
    .then(confirmStored)
    .catch(console.error);
}

function fetchPlayer(app, name) {
  app.searchDestinyPlayer(-1, name)
    .then((res) => {
      const player = res.Response;
      if (player) {
        return storePlayersData([
          ...Object.values(getAllPlayers() || {}),
          ...player
        ]);
      }
      return false;
    })
    .then(confirmStored)
    .catch((err) => {
      console.error(`searchPlayer Error: ${err}`);
    });
}

module.exports = { fetchManifest, fetchPlayer };
