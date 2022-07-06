const Model = require('./Model');

class Collectible extends Model {
  static table = 'DestinyCollectibleDefinition';

  constructor(hash) {
    super(hash, Collectible.table);
  }
}

module.exports = Collectible;
