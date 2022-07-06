const Model = require('./Model');

class SocketType extends Model {
  static table = 'DestinySocketTypeDefinition';

  constructor(hash) {
    super(hash, SocketType.table);
  }
}

module.exports = SocketType;
