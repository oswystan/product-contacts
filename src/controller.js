/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: controller.js
 *    description:
 *        created: 2016-12-31 19:16:10
 *         author: wystan
 *
 *********************************************************************************
 */

var jwt = require('jsonwebtoken');
var db = require('./datastore/db');
var dbimport = require('./datastore/import');
var dberr = require('./datastore/error');
var cfg = require("./config")();
var logger = require("./log");
var maintain = require("./maintenance");
var database = new db();

var log = null;
exports = module.exports = {
    init: function() {
        log = logger.log();
        database.connect();
    },
    get: function(tab, req, res) {
        if (database[tab]) {
            database[tab].get(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    list: function(tab, req, res) {
        if (database[tab]) {
            database[tab].list(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    post: function(tab, req, res) {
        if (database[tab]) {
            database[tab].post(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    put: function(tab, req, res) {
        if (req._auth_.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        if (database[tab]) {
            database[tab].put(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    del: function(tab, req, res) {
        if (req._auth_.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        if (database[tab]) {
            database[tab].del(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },
    query: function(req, res) {
        if (req._auth_.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        database.query(req, res);
    },
    auth: function(req, res) {
        var p = req.body;
        for (var i = 0, l = cfg.user.length; i < l; i++) {
            var v = cfg.user[i];
            if (v.user == p.username && v.password == p.password) {
                var body = {
                    username: v.user,
                    role: v.role
                }
                var token = jwt.sign(body, cfg.jwt.secret, {
                    expiresIn: cfg.jwt.def_exp
                });
                res.send(dberr.succ(token));
                return;
            }
        }
        log.error("invalid auth info [" + p.username + ", " + p.password + "] from " + req.ip);
        res.send(dberr.unauth_usr());
    },
    upload: function (req, res) {
        if (req._auth_.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        maintain.trigger(true);
        if (!req.files || !('employee_file' in req.files || 'department_file' in req.files)) {
            log.warn("no files uploaded!");
            res.send(dberr.error(-1, "no files uploaded"));
            return;
        }
        var fl = [];
        if (req.files.employee_file) {
            fl.push({tab: "employees", file: req.files.employee_file});
        }
        if (req.files.department_file) {
            fl.push({tab: "departments", file: req.files.department_file});
        }

        var op_list = [];
        fl.forEach(function(v, idx) {
            var fn = __dirname + "/../upload/tmp/" + v.file.name;
            v.mv(fn, function(err) {
                if (err) {
                    op_list.push(v.file.name);
                }

                if (idx >= fl.length - 1) {
                    if (op_list.length == 0) {
                        res.send(dberr.succ("upload success", op_list));
                    } else {
                        var names = "";
                        op_list.forEach(function(f){
                            names += f + ","
                        });
                        names = names.substr(0, names.length-1);
                        res.send(dberr.error(-1, "upload [" + names + "] failed"));
                    }
                }
            });
        });
    }
};

/************************************* END **************************************/
