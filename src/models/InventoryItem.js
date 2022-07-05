const Model = require('./Model');

class InventoryItem extends Model {
  static table = 'DestinyInventoryItemDefinition';

  constructor(hash) {
    super(hash, InventoryItem.table);
  }

  handleData(data = {}) {
    this.displayProperties = data.displayProperties;
  }

  stats() {
    if (this.data.stats) {
      console.log(this.data.stats);
    }
  }

  get name() {
    return this.displayProperties ? this.displayProperties.name : null;
  }
}

module.exports = InventoryItem;
