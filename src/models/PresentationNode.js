const Model = require('./Model');

class PresentationNode extends Model {
  static table = 'DestinyPresentationNodeDefinition';

  constructor(hash) {
    super(hash, PresentationNode.table);
  }
}

module.exports = PresentationNode;
