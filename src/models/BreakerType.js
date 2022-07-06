const Model = require('./Model');

class BreakerType extends Model {
  static table = 'DestinyBreakerTypeDefinition';

  constructor(hash) {
    super(hash, BreakerType.table);
  }
}

module.exports = BreakerType;
