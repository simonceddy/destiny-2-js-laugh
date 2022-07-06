const Model = require('./Model');

class Activity extends Model {
  static table = 'DestinyActivityDefinition';

  constructor(hash) {
    super(hash, Activity.table);
  }
}

module.exports = Activity;
