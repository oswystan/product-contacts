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
var database = new db();
database.connect();

exports = module.exports = {
    get: function (tab, req, res) {
        if (database[tab]) {
            database[tab].get(req, res);
        } else {
            res.send("");
        }
    },

    list: function (tab, req, res) {
        if (database[tab]) {
            database[tab].list(req, res);
        } else {
            res.send("");
        }
    },

    post: function (tab, req, res) {
        if (database[tab]) {
            database[tab].post(req, res);
        } else {
            res.send("");
        }
    },

    put: function (tab, req, res) {
        if (database[tab]) {
            database[tab].put(req, res);
        } else {
            res.send("");
        }
    },

    del: function (tab, req, res) {
        if (database[tab]) {
            database[tab].del(req, res);
        } else {
            res.send("");
        }
    },
};

/************************************* END **************************************/
