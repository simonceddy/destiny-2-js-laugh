const CurrentPlayer = require('./CurrentPlayer');

async function playerBuilder(d2, playerData) {
  const res = await d2.getProfile(
    playerData.membershipType,
    playerData.membershipId,
    [100]
  );
  // console.log(profile);

  return new CurrentPlayer(d2, {
    data: playerData,
    profile: res.Response ? res.Response.profile : null
  });
}

module.exports = playerBuilder;
