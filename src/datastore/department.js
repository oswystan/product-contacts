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
        var sql = `select * from departments
            offset $1 limit $2;`;

        var q = req.query;
        if (q.limit) {
            q.limit = Number.parseInt(q.limit);
        } else {
            q.limit = cfg.max_rows;
        }

        var val = [
            q.offset || 0,
            util.min(q.limit, cfg.max_rows),
        ];

        util.do_query(cli, {text: sql, values: val}, res);
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
