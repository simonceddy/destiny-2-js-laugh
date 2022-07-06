const Model = require('./Model');

class Unlock extends Model {
  static table = 'DestinyUnlockDefinition';

  constructor(hash) {
    super(hash, Unlock.table);
  }
}

module.exports = Unlock;
