const Model = require('./Model');

class SeasonPass extends Model {
  static table = 'DestinySeasonPassDefinition';

  constructor(hash) {
    super(hash, SeasonPass.table);
  }
}

module.exports = SeasonPass;
