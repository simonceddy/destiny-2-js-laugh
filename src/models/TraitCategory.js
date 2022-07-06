const Model = require('./Model');

class TraitCategory extends Model {
  static table = 'DestinyTraitCategoryDefinition';

  constructor(hash) {
    super(hash, TraitCategory.table);
  }
}

module.exports = TraitCategory;
