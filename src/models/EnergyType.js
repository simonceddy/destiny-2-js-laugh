const Model = require('./Model');

class EnergyType extends Model {
  static table = 'DestinyEnergyTypeDefinition';

  constructor(hash) {
    super(hash, EnergyType.table);
  }
}

module.exports = EnergyType;
