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
var session = require('express-session');
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
    log4js.configure({
        appenders:[
            {type: 'console'},
            {type: 'file', filename: 'logs/contacts.log', category: 'contacts', maxLogSize: 1*1024*1024, backups: 10}
        ]
    });
    log = log4js.getLogger("contacts");
}

function main() {
    init_log();
    var opts = { evel: 'auto', format: ':remote-addr :response-time :status :method :url', nolog: '\\.gif|\\.jpg|\\.js$' };
    app.use(log4js.connectLogger(log, opts));
    app.set('json spaces', 40);
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    app.use(session({name: "contacts", secret: "mysecret", resave: false, saveUninitialized: true}));
    app.use(auth.auth());
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
