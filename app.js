#!/usr/bin/env node
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

var express = require('express');
var bodyparser = require("body-parser");
var log = require('log4js').getLogger("contacts");
var app = express();

var router = require("./router");

function main() {
    app.use(bodyparser.json());
    router.init(app);

    log.info('contacts server started ...');
    app.listen(8000);
}

main();

/************************************END****************************************/
