var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var uuid = require('node-uuid');
var models = 'notification';
mongoose.Promise = Promise;
var notification = new Schema({
    id: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        index: true,
        default: uuid.v4()
    },
    userId: {
        type: String
    },
    publicKey: {
        type: String
    },
    privateKey: {
        type: String
    }
});
module.exports = mongoose.model(models, notification);