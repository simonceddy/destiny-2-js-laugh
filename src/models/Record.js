const Model = require('./Model');

class Record extends Model {
  static table = 'DestinyRecordDefinition';

  constructor(hash) {
    super(hash, Record.table);
  }
}

module.exports = Record;
