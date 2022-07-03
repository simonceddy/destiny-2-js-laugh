const fs = require('fs');
const path = require('path');
const { destinyMembershipType } = require('node-destiny-2/lib/destiny-types');
const { STORAGE_DIR } = require('../support/consts');

/**
 * Fetch data for listed players
 * @param {import('node-destiny-2')} api The Destiny2API object
 * @return {Promise<object|false>}
 */
async function getPlayersData(api, players = []) {
  // console.log(players);
  const data = {};
  if (players[0]) {
    await Promise.all(players.map((playerName) => api
      .searchDestinyPlayer(destinyMembershipType.Steam, playerName)
      .then(async ({ Response }) => {
        if (Response && Response[0]) {
          const profile = await api.getProfile(
            Response[0].membershipType,
            Response[0].membershipId,
            [100]
          );
          console.log(profile);
          data[playerName] = {
            ...Response[0],
            profile: profile.Response && profile.Response.profile
              ? profile.Response.profile.data
              : null
          };
        }
      })
      .catch(console.error)));
    fs.writeFileSync(
      path.resolve(STORAGE_DIR, 'players.json'),
      JSON.stringify(data)
    );
    return data;
  }
  return false;
}

module.exports = getPlayersData;
