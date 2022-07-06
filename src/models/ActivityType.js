const Model = require('./Model');

class ActivityType extends Model {
  static table = 'DestinyActivityTypeDefinition';

  constructor(hash) {
    super(hash, ActivityType.table);
  }
}

module.exports = ActivityType;
