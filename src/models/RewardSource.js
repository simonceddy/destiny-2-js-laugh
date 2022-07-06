const Model = require('./Model');

class RewardSource extends Model {
  static table = 'DestinyRewardSourceDefinition';

  constructor(hash) {
    super(hash, RewardSource.table);
  }
}

module.exports = RewardSource;
