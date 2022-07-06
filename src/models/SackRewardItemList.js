const Model = require('./Model');

class SackRewardItemList extends Model {
  static table = 'DestinySackRewardItemListDefinition';

  constructor(hash) {
    super(hash, SackRewardItemList.table);
  }
}

module.exports = SackRewardItemList;
