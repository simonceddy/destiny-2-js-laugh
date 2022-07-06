const Model = require('./Model');

class TalentGrid extends Model {
  static table = 'DestinyTalentGridDefinition';

  constructor(hash) {
    super(hash, TalentGrid.table);
  }
}

module.exports = TalentGrid;
