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

imports = function (fl, db_client) {
    this.files = fl;
    this.cli = db_client;
};
inherits(imports, EventEmitter);

imports.tabs = {};
imports.tabs.employee = {
    validate: function(d) {
        if ("id" in d) {
            d.id = Number.parseInt(d.id);
        }
        if ("department" in d) {
            d.department = Number.parseInt(d.department);
        }
        return true;
    },
    import: function(cli, d, imp) {
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
        cli.query({text: sql, values: val}, function(err){
            if (err) {
                imp.emit("import-error", err);
            } else {
                imp.emit("import-succ", d);
            }
        });
        return true;
    },
    update_id: function(cli, imp) {
        var sql = `select max(id) as id from employees;`
        cli.query(sql, function(err, res) {
            if (err) {
                imp.emit("error", err);
                return;
            }
            var id = res.rows[0].id;
            sql = `select setval('employees_id_seq', %1);`
            cli.query({text: sql, values: [res.rows[0].id]}, function(err) {
                if (err) {
                    imp.emit("error", err);
                    return;
                }
                imp.emit("update_id", "success");
            });

        });
    	return true;
    }
};
imports.tabs.department = {
    validate: function(d) {
        return true;
    },
    import: function(cli, d, imp) {
        return true;
    },
    update_id: function(cli) {
    	return true;
    }
};

imports.prototype.parse = function(fn, tab) {
    var self = this;
    if (!(tab in imports.tabs)) {
        return false;
    }
    var table = imports.tabs[tab];
    fs.createReadStream(fn)
        .on('error', function(err) {
            self.emit('error', err);
        })
        .pipe(csv({headers: true}))
        .validate(function(data){
            return table.validate(data);
        })
        .on('data', function(data){
            table.import(self.cli, data, self);
        })
        .on("data-invalid", function(data){
            self.emit("data-invalid", data);
        })
        .on('end', function(){
        	table.update_id(self.cli);
            self.emit("end", tab);
        });
};

imports.prototype.do = function () {
    var self = this;
    this.files.forEach(function(val, idx) {
        self.parse(val.file, val.tab);
    });
};

/************************************* END **************************************/
