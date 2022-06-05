class Manifest {
  constructor(data) {
    this.data = data;
  }

  get version() {
    return this.data.version;
  }
}

module.exports = Manifest;
