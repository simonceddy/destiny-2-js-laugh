const Model = require('./Model');

class Race extends Model {
  static table = 'DestinyRaceDefinition';

  constructor(hash) {
    super(hash, Race.table);
  }
}

module.exports = Race;
