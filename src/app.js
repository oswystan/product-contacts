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
var express_jwt = require('express-jwt');
var cfg = require("./config")();

var logger = require('./log');
var app = express();

var router = require("./router");
var auth = require("./auth");

function main() {
    logger.init();
    var log = logger.log();
    var session_opts = {
        name: "contacts",
        secret: "mysecret",
        resave: false,
        saveUninitialized: true
    };
    var credentials = {
        key: fs.readFileSync(__dirname + '/keys/key.pem', 'utf8'),
        cert: fs.readFileSync(__dirname + '/keys/cert.pem', 'utf8')
    };
    var jwt_opts = {
        requestProperty: "_auth_",
        secret: cfg.jwt.secret,
    };

    app.use(logger.express());
    app.set('json spaces', 40);
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    app.use(session(session_opts));
    app.use(auth.auth());
    app.use("/api", express_jwt(jwt_opts).unless({path: ['/api/auth']}));
    app.use(express.static(__dirname + "/static"));
    router.init(app);

    var server = https.createServer(credentials, app);

    server.listen(8000);
    log.info('contacts server started ...');
}

module.exports = function () {
    this.run = main;
}

/************************************END****************************************/
