const Model = require('./Model');

class ProgressionLevelRequirement extends Model {
  static table = 'DestinyProgressionLevelRequirementDefinition';

  constructor(hash) {
    super(hash, ProgressionLevelRequirement.table);
  }
}

module.exports = ProgressionLevelRequirement;
