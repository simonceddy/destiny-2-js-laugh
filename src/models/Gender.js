const Model = require('./Model');

class Gender extends Model {
  static table = 'DestinyGenderDefinition';

  constructor(hash) {
    super(hash, Gender.table);
  }
}

module.exports = Gender;
