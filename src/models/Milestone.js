const Model = require('./Model');

class Milestone extends Model {
  static table = 'DestinyMilestoneDefinition';

  constructor(hash) {
    super(hash, Milestone.table);
  }
}

module.exports = Milestone;
