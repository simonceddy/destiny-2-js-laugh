const Model = require('./Model');

class SocketCategory extends Model {
  static table = 'DestinySocketCategoryDefinition';

  constructor(hash) {
    super(hash, SocketCategory.table);
  }
}

module.exports = SocketCategory;
