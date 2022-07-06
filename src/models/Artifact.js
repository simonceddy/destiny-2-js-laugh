const Model = require('./Model');

class Artifact extends Model {
  static table = 'DestinyArtifactDefinition';

  constructor(hash) {
    super(hash, Artifact.table);
  }
}

module.exports = Artifact;
