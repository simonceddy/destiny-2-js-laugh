const Model = require('./Model');

class SandboxPattern extends Model {
  static table = 'DestinySandboxPatternDefinition';

  constructor(hash) {
    super(hash, SandboxPattern.table);
  }
}

module.exports = SandboxPattern;
