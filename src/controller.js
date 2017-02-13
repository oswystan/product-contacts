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
var dberr = require('./datastore/error');
var cfg = require("./config")();
var database = new db();

exports = module.exports = {
    init: function () {
        database.connect();
    },
    get: function (tab, req, res) {
        if (database[tab]) {
            database[tab].get(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    list: function (tab, req, res) {
        if (database[tab]) {
            database[tab].list(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    post: function (tab, req, res) {
        if (database[tab]) {
            database[tab].post(req, res);
        } else {
            res.send(dberr.no_such_table(tab));
        }
    },

    put: function (tab, req, res) {
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

    del: function (tab, req, res) {
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
    query: function (req, res) {
        if (req._auth_.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        database.query(req, res);
    },
    auth: function (req, res) {
        var p = req.body;
        for (var i = 0, l = cfg.user.length; i < l; i++) {
            var v = cfg.user[i];
            if (v.user == p.username && v.password == p.password) {
                var body = {username: v.user, role: v.role}
                var token = jwt.sign(body, cfg.jwt.secret, {expiresIn: cfg.jwt.def_exp});
                res.send(dberr.succ(token));
                return;
            }
        }
        console.log("invalid auth info [" + p.username + ", " + p.password + "] from " + req.ip);
        res.send(dberr.unauth_usr());
    }
};

/************************************* END **************************************/
