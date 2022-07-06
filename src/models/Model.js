const EventEmitter = require('events');
// const database = require('../database');
const { asyncGet } = require('../util/asyncQueries');

function fromHash(hash, table) {
  if (table) {
    const sql = `SELECT id, json FROM ${table} WHERE json LIKE '%"hash":${hash}%'`;
    return asyncGet(sql);
  }

  return Promise.resolve(false);
}

class Model extends EventEmitter {
  constructor(hash, table = null) {
    super();
    this.table = table;
    this.id = null;
    if (typeof hash === 'number') {
      this.hash = hash;
    }
  }

  async getData() {
    if (this.hash) {
      const data = await fromHash(this.hash, this.table);
      this.emit('data-fetched', data);
      return data && data.json ? {
        id: data.id,
        json: JSON.parse(data.json)
      } : null;
    }

    return false;
  }

  /**
   * Populate model data from the database
   * @param {number} hash Hash for the model
   * @returns {Promise<this>}
   */
  async populate(hash = null) {
    if (!this.hash && hash) {
      this.hash = hash;
    }
    const r = await this.getData();

    if (r && r.id && r.json) {
      this.data = r.json;
      this.id = r.id;
    }

    if (this.handleData) await this.handleData(this.data);
    this.emit('model-populated', this);
    return this;
  }

  get name() {
    return this.data && this.data.displayProperties
      ? this.data.displayProperties.name
      : null;
  }
}

module.exports = Model;
