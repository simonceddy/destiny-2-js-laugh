const Model = require('./Model');

class Stat extends Model {
  static table = 'DestinyStatDefinition';

  constructor(hash, value = 0) {
    super(hash, Stat.table);
    this.value = value;
  }

  handleData(data) {
    if (data.displayProperties) {
      this.displayProperties = data.displayProperties;
    }
  }

  get name() {
    return this.displayProperties ? this.displayProperties.name : null;
  }
}

module.exports = Stat;
