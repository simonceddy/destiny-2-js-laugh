const Model = require('./Model');

class VendorGroup extends Model {
  static table = 'DestinyVendorGroupDefinition';

  constructor(hash) {
    super(hash, VendorGroup.table);
  }
}

module.exports = VendorGroup;
