const Model = require('./Model');

class PlugSet extends Model {
  static table = 'DestinyPlugSetDefinition';

  constructor(hash) {
    super(hash, PlugSet.table);
  }
}

module.exports = PlugSet;
