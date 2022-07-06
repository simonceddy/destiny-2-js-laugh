const Model = require('./Model');

class Season extends Model {
  static table = 'DestinySeasonDefinition';

  constructor(hash) {
    super(hash, Season.table);
  }
}

module.exports = Season;
