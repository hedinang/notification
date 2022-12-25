'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config/config.js').mongodbUrl;
const dbConfig = _.extend(config, {
    database: config.database,
    username: config.username,
    password: config.password,
    port: config.port,
    host: config.host
});
const REPLICATE_STRING = config.replicateString;
const CONNECTION_ATLAS = config.connectionAtlas;
let dbName = process.env.MONGO_DBNAME || 'advocado_live';

let connectionString = `${dbConfig.prefix + dbConfig.host}:${dbConfig.port}/${dbName}`;
if (REPLICATE_STRING) {
    connectionString = REPLICATE_STRING;
}
if (CONNECTION_ATLAS) {
    connectionString = CONNECTION_ATLAS;
}
mongoose.connect(connectionString, {
    dbName: dbName,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    retryWrites: false

}).catch(function (e) {
    logger && logger.log('error', '-------> Fatal Error connection mongoose %s', e);
});
mongoose.connection.on('error', err => {
    logger && logger.log('error', '-------> Error connection mongoose %s', err);
});
JSON.safeStringify = (obj, indent = 0) => {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) =>
            typeof value === 'object' && value !== null
                ? cache.includes(value)
                    ? undefined // Duplicate reference found, discard key
                    : cache.push(value) && value // Store value in our collection
                : value,
        indent
    );
    cache = null;
    return retVal;
};

const db = {};
db.Types = mongoose.Types;
db.Api = require('./api');
db.Grade = require('./grade');
db.Student = require('./student');
module.exports = db;
