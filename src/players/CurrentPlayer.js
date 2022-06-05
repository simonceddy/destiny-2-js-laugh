/* eslint-disable no-unused-vars */
const Destiny2API = require('node-destiny-2/lib/destiny-2-api');
const Character = require('../characters/Character');

const defaultProps = {
  data: {
    iconPath: null,
    crossSaveOverride: null,
    applicableMembershipTypes: [],
    isPublic: null,
    membershipType: null,
    membershipId: null,
    displayName: null,
    bungieGlobalDisplayName: null,
    bungieGlobalDisplayNameCode: null,
  },
  profile: {
    data: {
      userInfo: {},
      dateLastPlayed: null,
      versionsOwned: null,
      characterIds: [],
      seasonHashes: [],
      currentSeasonHash: null,
      currentSeasonRewardPowerCap: null
    },
    privacy: 1,
  }
};

class CurrentPlayer {
  /**
   * Create a new CurrentPlayer object
   * @param {Destiny2API} d2 The Destiny api object
   * @param {object} props Player data from searchDestinyPlayer
   */
  constructor(d2, props = defaultProps) {
    this.d2 = d2;
    this.data = props.data;
    this.profile = props.profile;
    this.characters = {};
    this.getCharacter = this.getCharacter.bind(this);
  }

  get characterIds() {
    return this.profile.data.characterIds;
  }

  async getCharacter(characterId, forceRefresh = false) {
    if (forceRefresh || !this.characters[characterId]) {
      const { membershipId, membershipType } = this.data;
      console.log(membershipId, membershipType);
      const res = await this.d2.getCharacter(
        membershipType,
        membershipId,
        characterId,
        [200, 205]
      );
      if (res.Response && res.Response.character) {
        this.characters[characterId] = new Character(this.d2, {
          ...res.Response.character,
          equipment: res.Response.equipment
        });
      }
    }
    return this.characters[characterId];
  }
}

module.exports = CurrentPlayer;
