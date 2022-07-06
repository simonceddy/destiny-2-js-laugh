const Model = require('./Model');

class Checklist extends Model {
  static table = 'DestinyChecklistDefinition';

  constructor(hash) {
    super(hash, Checklist.table);
  }
}

module.exports = Checklist;
