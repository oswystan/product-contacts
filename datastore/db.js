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
var checker = require('./checker');

exports = module.exports = function (){
    var cfg = new dbcfg();

    function check_query(obj) {
        var c = new checker();
        var ret = 
            c.begin()
            .val(obj.tab, 'tab').not_null().is_string()
            .val(obj.fields, 'fields').not_null().is_string()
            .val(obj.where, 'where').is_string()
            .val(obj.orderby, 'orderby').is_string()
            .val(obj.offset, 'offset').is_number()
            .val(obj.limit, 'limit').is_number()
            .val(obj.all, 'all').is_bool()
            .end();
        delete c;
        return ret;
    }

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
        var err = check_query(p);
        if (err) {
            console.log(p);
            res.send(dberr.invalid_input(err));
            return;
        }

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
