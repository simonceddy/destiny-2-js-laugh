const Model = require('./Model');

class Achievement extends Model {
  static table = 'DestinyAchievementDefinition';

  constructor(hash) {
    super(hash, Achievement.table);
  }
}

module.exports = Achievement;
