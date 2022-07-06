const Model = require('./Model');

class MedalTier extends Model {
  static table = 'DestinyMedalTierDefinition';

  constructor(hash) {
    super(hash, MedalTier.table);
  }
}

module.exports = MedalTier;
