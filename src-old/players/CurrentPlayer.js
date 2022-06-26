/* eslint-disable no-unused-vars */
const Destiny2API = require('node-destiny-2/lib/destiny-2-api');
const Character = require('../characters/Character');
const defaultPlayerProps = require('../support/defaultPlayerProps');

/**
 * @todo Remove d2 object from classes, instead pass objects around
 */
class CurrentPlayer {
  /**
   * Create a new CurrentPlayer object
   * @param {Destiny2API} d2 The Destiny api object
   * @param {object} props Player data from searchDestinyPlayer
   */
  constructor(d2, props = defaultPlayerProps) {
    this.d2 = d2;
    this.data = props.data;
    this.profile = props.profile;
    this.characters = {};
  }

  get characterIds() {
    return this.profile.data.characterIds;
  }

  get displayName() {
    return this.data.displayName;
  }

  get fullName() {
    return `${this.data.bungieGlobalDisplayName}#${this.data.bungieGlobalDisplayNameCode}`;
  }

  get membershipType() {
    return this.data.membershipType;
  }

  get membershipId() {
    return this.data.membershipId;
  }

  getMembership() {
    return {
      membershipId: this.membershipId,
      membershipType: this.membershipType,
    };
  }
}

module.exports = CurrentPlayer;
