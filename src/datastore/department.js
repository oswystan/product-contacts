/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: department.js
 *    description:
 *        created: 2016-12-31 21:46:46
 *         author: wystan
 *
 *********************************************************************************
 */

var dberr = require('./error');
var util = require('./utils');

exports = module.exports = function (cli) {
    var cfg = cli.cfg

    this.list = function (req, res) {
        var sql = `select * from departments`;
        var sqlc = "select count(id) as cnt from departments";
        var limit = " offset $1 limit $2";
        var where = null;
        var order = " order by id";

        var q = req.query;
        if ('name' in q) {
            where = " where name like '" + q.name + "%%'";
        }
        if ('id' in q) {
            if (where) {
                where += " and id = " + q.id;
            } else {
                where = " where id = " + q.id;
            }
        }
        if ('leader' in q) {
            if (where) {
                where += " and leader = " + q.leader;
            } else {
                where = " where leader = " + q.leader;
            }
        }
        if (q.limit) {
            q.limit = Number.parseInt(q.limit);
        } else {
            q.limit = cfg.max_rows;
        }
        if (where) {
            sql += where;
            sqlc += where;
        }
        sql += order;
        sql += limit;

        var val = [
            q.offset || 0,
            util.min(q.limit, cfg.max_rows),
        ];

        if (val[0] == 0) {
            util.do_query(cli, {text: sql, values: val}, sqlc, res);
        } else {
            util.do_query(cli, {text: sql, values: val}, res);
        }
    };

    this.get = function (req, res) {
        var sql = 'select * from departments where id=' + req.params.id;
        util.do_query(cli, sql, res);
    };

    this.post = function (req, res) {
        var sql = `insert into departments (name, leader)
            values ($1, $2) returning *;`;
        var val = [
            req.body.name || '',
            req.body.leader || null,
        ];

        util.do_query(cli, {text: sql, values: val}, res);
    };

    this.put = function (req, res) {
        var sql = `update departments
            set name=$1, leader=$2
            where id = $3 returning *;`;
        var val = [
            req.body.name || '',
            req.body.leader || null,
            req.body.id
        ];

        util.do_query(cli, {text: sql, values: val}, res);
    };

    this.del = function (req, res) {
        var sql = `delete from departments where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        util.do_query(cli, {text: sql, values: val}, res);
    };
};

/************************************* END **************************************/
