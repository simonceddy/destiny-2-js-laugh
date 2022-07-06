const Model = require('./Model');

class SandboxPerk extends Model {
  static table = 'DestinySandboxPerkDefinition';

  constructor(hash) {
    super(hash, SandboxPerk.table);
  }
}

module.exports = SandboxPerk;
