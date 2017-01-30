/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: app.js
 *    description:
 *        created: 2016-03-28 23:00:17
 *         author: wystan
 *
 *********************************************************************************
 */

var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyparser = require("body-parser");
var log = require('log4js').getLogger("contacts");
var app = express();

var router = require("./router");
var auth = require("./auth");

function main() {
    app.set('json spaces', 40);
    app.use(bodyparser.json());
    app.use(auth());
    app.use(express.static(__dirname + "/static"));
    router.init(app);

    var credentials = {
        key: fs.readFileSync(__dirname + '/keys/key.pem', 'utf8'),
        cert: fs.readFileSync(__dirname + '/keys/cert.pem', 'utf8')
    };

    var server = https.createServer(credentials, app);

    server.listen(8000);
    log.info('contacts server started ...');
}

module.exports = function () {
    this.run = main;
}

/************************************END****************************************/
