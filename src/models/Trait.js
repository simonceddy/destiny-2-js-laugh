const Model = require('./Model');

class Trait extends Model {
  static table = 'DestinyTraitDefinition';

  constructor(hash) {
    super(hash, Trait.table);
  }
}

module.exports = Trait;
