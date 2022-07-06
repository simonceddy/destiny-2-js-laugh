const Model = require('./Model');

class Location extends Model {
  static table = 'DestinyLocationDefinition';

  constructor(hash) {
    super(hash, Location.table);
  }
}

module.exports = Location;
