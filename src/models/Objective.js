const Model = require('./Model');

class Objective extends Model {
  static table = 'DestinyObjectiveDefinition';

  constructor(hash) {
    super(hash, Objective.table);
  }
}

module.exports = Objective;
