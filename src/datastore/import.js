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

imports.tabs = {};
imports.tabs.employee = {
    validate: function(d) {
        return true;
    },
    import: function(cli, d) {
    	var sql = `insert into employees (id, name, department, mobile, tel, mail, position, role)
    		values
    		($1, $2, $3, $4, $5, $6, $7, $8)`;
        var val = [
            d.id,
            d.name || '',
            d.department || null,
            d.mobile || '',
            d.tel || '',
            d.mail || '',
            d.position || '',
            d.role || ''
        ];
        cli.query({text: sql, values: val});
        return true;
    },
    update_id: function(cli) {
    	return true;
    }
};
imports.tabs.department = {
    validate: function(d) {
        return true;
    },
    import: function(cli, d) {
        return true;
    },
    update_id: function(cli) {
    	return true;
    }
};

imports.prototype.parse = function(fn, tab) {
    var self = this;
    if (!(tab in imports.tabs) {
        return false;
    }
    var table = imports.tabs[tab];
    fs.createReadStream(fn)
        .on('error', function(err) {
            self.trigger('error', err);
        })
        .pipe(csv({headers: true}))
        .validate(function(data){
            return table.validate(data);
        })
        .on('data', function(data){
            table.import(self.cli, data);
        })
        .on("data-invalid", function(data){
            console.log("invalid data:" data);
        })
        .on('end', function(){
        	table.update_id(self.cli);
            console.log("END");
        });
};

imports.prototype.do = function () {
    var self = this;
    this.files.forEach(function(val, idx) {
        self.parse(val.file, val.tab);
    });
};

/************************************* END **************************************/
