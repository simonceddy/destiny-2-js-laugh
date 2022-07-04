const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { STORAGE_DIR } = require('../support/consts');

const dbPath = path.resolve(STORAGE_DIR, 'current.db');
console.log(dbPath);
const database = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

module.exports = database;
