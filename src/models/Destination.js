const Model = require('./Model');

class Destination extends Model {
  static table = 'DestinyDestinationDefinition';

  constructor(hash) {
    super(hash, Destination.table);
  }
}

module.exports = Destination;
