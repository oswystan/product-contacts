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
var log4js = require('log4js');
var app = express();

var router = require("./router");
var auth = require("./auth");
var log = null;

function init_log() {
    var dir = __dirname + "/../logs";
    try {
        fs.accessSync(dir);
    } catch (e){
        fs.mkdirSync(dir);
    }
    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file('logs/contacts.log'), 'contacts');
    log = log4js.getLogger("contacts");
}

function main() {
    init_log();
    app.use(log4js.connectLogger(log, { evel: 'auto', format: ':remote-addr :status :response-time :method :url', nolog: '\\.gif|\\.jpg|\\.js$' }));
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
