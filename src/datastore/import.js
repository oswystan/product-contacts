/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: import.js
 *    description:
 *        created: 2017-02-23 17:00:22
 *         author: wystan
 *
 *********************************************************************************
 */
var csv = require('fast-csv');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

var imports = module.exports;
inherits(imports, EventEmitter);

imports = function (fl, db_client) {
    this.files = fl;
    this.cli = db_client;
};

imports.parse = function(fn, tab) {
    var self = this;
    fs.createReadStream(fn)
        .on('error', function(err) {
            self.trigger('error', err);
        })
        .pipe(csv())
        .validate(function(data){
            return data.length == 3;
        })
        .on('data', function(data){
            console.log('import data into database:', data);
        })
        .on("data-invalid", function(data){
            console.log("invalid data:" data);
        })
        .on('end', function(){
            console.log("END");
        });
};

imports.do = function () {
    var self = this;
    this.files.forEach(function(val, idx) {
        self.parse(val.file, val.tab);
    });
};

/************************************* END **************************************/
