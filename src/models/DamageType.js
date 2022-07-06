const Model = require('./Model');

class DamageType extends Model {
  static table = 'DestinyDamageTypeDefinition';

  constructor(hash) {
    super(hash, DamageType.table);
  }
}

module.exports = DamageType;
