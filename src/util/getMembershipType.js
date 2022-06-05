const { destinyMembershipType } = require('node-destiny-2/lib/destiny-types');

function getMembershipType(type = -1) {
  const found = Object.entries(destinyMembershipType).find((vals) => vals[1] === type);
  return found ? { type: found[1], name: found[0] } : false;
}

module.exports = getMembershipType;
