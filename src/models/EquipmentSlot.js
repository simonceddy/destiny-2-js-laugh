const Model = require('./Model');

class EquipmentSlot extends Model {
  static table = 'DestinyEquipmentSlotDefinition';

  constructor(hash) {
    super(hash, EquipmentSlot.table);
  }
}

module.exports = EquipmentSlot;
