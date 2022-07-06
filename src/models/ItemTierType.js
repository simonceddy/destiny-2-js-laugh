const Model = require('./Model');

class ItemTierType extends Model {
  static table = 'DestinyItemTierTypeDefinition';

  constructor(hash) {
    super(hash, ItemTierType.table);
  }
}

module.exports = ItemTierType;
