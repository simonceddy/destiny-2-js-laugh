const Model = require('./Model');

class ActivityGraph extends Model {
  static table = 'DestinyActivityGraphDefinition';

  constructor(hash) {
    super(hash, ActivityGraph.table);
  }
}

module.exports = ActivityGraph;
