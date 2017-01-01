/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: db.js
 *    description: 
 *        created: 2016-12-31 22:04:35
 *         author: wystan
 *
 *********************************************************************************
 */

var pg = require('pg');
var employee = require('./employee');
var department = require('./department');
var dberr = require('./error');
var dbcfg = require('./config');

exports = module.exports = function (){
    var cfg = new dbcfg();

    this.connect = function () {
        var client = new pg.Client({
            user: cfg.user,
            password: cfg.password,
            database: cfg.dbname
        });
        client.connect();
        client.cfg = cfg;

        this.cli = client;
        this.employees = new employee(this.cli);
        this.departments = new department(this.cli);
    };
    this.query = function (req, res) {
        var p = req.body;
        var sql = "select " + p.fields + " from " + p.tab;
        if ('where' in p) {
            sql += " where " + p.where;
        }
        if ('orderby' in p) {
            sql += " order by " + p.orderby;
        }
        if ('offset' in p) {
            sql += " offset " + p.offset;
        }
        if ('limit' in p) {
            if (p.limit <= 0 || p.limit > cfg.max_rows) {
                p.limit = cfg.max_rows;
            }
            sql += " limit " + p.limit;
        } else {
            sql += " limit " + cfg.max_rows;
        }

        this.cli.query(sql, function (err, result) {
            if (err) {
                res.send(dberr.db_internal(err));
                return;
            }

            res.send(dberr.succ(result.rows));
        });
    };
};

/************************************* END **************************************/
