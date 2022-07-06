const Model = require('./Model');

class InventoryBucket extends Model {
  static table = 'DestinyInventoryBucketDefinition';

  constructor(hash) {
    super(hash, InventoryBucket.table);
  }
}

module.exports = InventoryBucket;
