const D2 = require('node-destiny-2/lib/destiny-2-api');

// Pointless wrapper at present
class D2API extends D2 {
  constructor(config = {}) {
    if (!config.key) {
      console.error('No app key provided');
    }
    super(config);
    console.log(config);
  }
}

module.exports = D2API;
