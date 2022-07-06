const Model = require('./Model');

class Lore extends Model {
  static table = 'DestinyLoreDefinition';

  constructor(hash) {
    super(hash, Lore.table);
  }
}

module.exports = Lore;
