const Model = require('./Model');

class ActivityModifier extends Model {
  static table = 'DestinyActivityModifierDefinition';

  constructor(hash) {
    super(hash, ActivityModifier.table);
  }
}

module.exports = ActivityModifier;
