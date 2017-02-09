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
var cfg = require('../config')().db;
var checker = require('./checker');
var util = require('./utils');

exports = module.exports = function (){

    function check_query(obj) {
        var c = new checker();
        var err =
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
        return err;
    }

    this.connect = function () {
        var client = new pg.Client({
            user: cfg.user,
            password: cfg.password,
            database: cfg.dbname
        });
        client.connect(function (err) {
            if (err) {
                console.log("fail to connect database: " + err);
                return;
            }
            client.cfg = cfg;

            this.cli = client;
            this.employees = new employee(this.cli);
            this.departments = new department(this.cli);
        });
    };

    this.query = function (req, res) {
        var p = req.body;
        var err = check_query(p);
        if (err) {
            console.log(p);
            res.send(dberr.invalid_input(err));
            return;
        }
        if (p.fields == "") {
            p.fields = "*";
        }

        var sql = "select " + p.fields + " from " + p.tab;
        var sqlc = "select count(*) as cnt from " + p.tab;
        if ('where' in p && p.where != "") {
            sql += " where " + p.where;
            sqlc += " where " + p.where;
        }
        if ('orderby' in p && p.orderby != "") {
            sql += " order by " + p.orderby;
        } else {
            sql += " order by id";
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

        console.log(sql);

        util.do_query(this.cli, sql, sqlc, res);
    };
};

/************************************* END **************************************/
