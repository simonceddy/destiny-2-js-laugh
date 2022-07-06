const Model = require('./Model');

class ItemCategory extends Model {
  static table = 'DestinyItemCategoryDefinition';

  constructor(hash) {
    super(hash, ItemCategory.table);
  }
}

module.exports = ItemCategory;
