const Model = require('./Model');

class MaterialRequirementSet extends Model {
  static table = 'DestinyMaterialRequirementSetDefinition';

  constructor(hash) {
    super(hash, MaterialRequirementSet.table);
  }
}

module.exports = MaterialRequirementSet;
