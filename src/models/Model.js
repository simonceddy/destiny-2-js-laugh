const EventEmitter = require('events');
const database = require('../database');

function fromHash(hash, table) {
  if (table) {
    const sql = `SELECT id, json FROM ${table} WHERE json LIKE '%"hash":${hash}%'`;
    return new Promise((resolve, reject) => {
      database
        .get(sql, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
    });
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

  async populate(hash = null) {
    if (!this.hash && hash) {
      this.hash = hash;
    }
    const r = await this.getData();

    if (r && r.id && r.json) {
      this.data = r.json;
      this.id = r.id;
    }

    if (this.handleData) this.handleData(this.data);
    this.emit('model-populated', this);
    return this;
  }
}

module.exports = Model;
