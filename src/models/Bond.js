const Model = require('./Model');

class Bond extends Model {
  static table = 'DestinyBondDefinition';

  constructor(hash) {
    super(hash, Bond.table);
  }
}

module.exports = Bond;
