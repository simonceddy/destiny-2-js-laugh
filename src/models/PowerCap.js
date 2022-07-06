const Model = require('./Model');

class PowerCap extends Model {
  static table = 'DestinyPowerCapDefinition';

  constructor(hash) {
    super(hash, PowerCap.table);
  }
}

module.exports = PowerCap;
