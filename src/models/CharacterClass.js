const Model = require('./Model');

class CharacterClass extends Model {
  static table = 'DestinyClassDefinition';

  constructor(hash) {
    super(hash, CharacterClass.table);
  }
}

module.exports = CharacterClass;
