const fs = require('fs');
const { storagePath } = require('./util/storage');

class Manifest {
  static path = storagePath('manifest.json');

  constructor() {
    this.version = null;
    this.dbPath = null;

    if (fs.existsSync(Manifest.path)) {
      const data = JSON.parse(fs.readFileSync(Manifest.path).toString());
      this.version = data.version;
      this.dbPath = data.mobileWorldContentPaths.en;
    }
  }
}

module.exports = Manifest;
