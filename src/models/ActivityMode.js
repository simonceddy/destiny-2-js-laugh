const Model = require('./Model');

class ActivityMode extends Model {
  static table = 'DestinyActivityModeDefinition';

  constructor(hash) {
    super(hash, ActivityMode.table);
  }
}

module.exports = ActivityMode;
