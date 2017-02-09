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

var db = require('./datastore/db');
var dberr = require('./datastore/error');
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
        if (req.session.role != 1) {
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
        if (req.session.role != 1) {
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
        if (req.session.role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        database.query(req, res);
    },
};

/************************************* END **************************************/
