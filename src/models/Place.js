const Model = require('./Model');

class Place extends Model {
  static table = 'DestinyPlaceDefinition';

  constructor(hash) {
    super(hash, Place.table);
  }
}

module.exports = Place;
