const Model = require('./Model');

class Metric extends Model {
  static table = 'DestinyMetricDefinition';

  constructor(hash) {
    super(hash, Metric.table);
  }
}

module.exports = Metric;
