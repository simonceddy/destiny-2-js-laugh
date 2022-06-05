const Character = require('./Character');

async function getPlayerCharacter(d2, player, characterId) {
  const { membershipId, membershipType } = player.getMembership();
  const res = await d2.getCharacter(
    membershipType,
    membershipId,
    characterId,
    [200, 205]
  );
  // console.log(res);
  if (res.Response && res.Response.character) {
    return new Character({
      ...res.Response.character,
      equipment: res.Response.equipment
    });
  }

  return false;
}

module.exports = getPlayerCharacter;
