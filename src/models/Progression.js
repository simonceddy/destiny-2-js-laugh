const Model = require('./Model');

class Progression extends Model {
  static table = 'DestinyProgressionDefinition';

  constructor(hash) {
    super(hash, Progression.table);
  }
}

module.exports = Progression;
