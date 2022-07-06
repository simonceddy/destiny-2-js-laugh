const Model = require('./Model');

class StatGroup extends Model {
  static table = 'DestinyStatGroupDefinition';

  constructor(hash) {
    super(hash, StatGroup.table);
  }
}

module.exports = StatGroup;
