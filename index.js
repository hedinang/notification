const express = require("express")
require('dotenv').config();
const winston = require('./config/winston');
const routerList = require('./router/index');
const bodyParser = require('body-parser');
const _ = require('lodash');
var app = express()
app.set('port', process.env.PORT || 3000);
global.logger = winston;
// middleware or filter
app.use((req, res, next) => {
    console.log('LOGGED')
    next()
})
// in order to format body req
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

_.each(routerList, function (routerConfig) {
    _.map(routerConfig, function (value, key) {
        app.use(key, require(value));
    });
});

let server = app.listen(app.get('port'), function () {
    logger.info('Express server listening on port ' + server.address().port);
});