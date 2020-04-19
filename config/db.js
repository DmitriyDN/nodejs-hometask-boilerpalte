const path = require('path');
const dbPath = `${path.resolve()}/database.json`;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(dbPath);

const dbAdapter = low(adapter);

const defaultDb = { users: [], fighters: [], fights: [] };

dbAdapter.defaults(defaultDb).write();

exports.dbAdapter = dbAdapter;