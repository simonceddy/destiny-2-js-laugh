const Model = require('./Model');

class Faction extends Model {
  static table = 'DestinyFactionDefinition';

  constructor(hash) {
    super(hash, Faction.table);
  }
}

module.exports = Faction;
