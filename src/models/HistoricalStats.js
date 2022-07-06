const Model = require('./Model');

class HistoricalStats extends Model {
  static table = 'DestinyHistoricalStatsDefinition';

  constructor(hash) {
    super(hash, HistoricalStats.table);
  }
}

module.exports = HistoricalStats;
