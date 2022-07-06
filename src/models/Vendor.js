const Model = require('./Model');

class Vendor extends Model {
  static table = 'DestinyVendorDefinition';

  constructor(hash) {
    super(hash, Vendor.table);
  }
}

module.exports = Vendor;
