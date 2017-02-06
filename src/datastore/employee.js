/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: employee.js
 *    description:
 *        created: 2016-12-31 21:46:17
 *         author: wystan
 *
 *********************************************************************************
 */

var dberr = require('./error');
var checker = require('./checker');
var util = require('./utils');

exports = module.exports = function (cli) {
    this.client = cli;
    var cfg = cli.cfg;

    function check_values(obj) {
        var c = new checker();
        var err =
        c.begin()
            .val(obj.name, 'name').not_null().is_string().not_empty()
            .val(obj.department, 'department').is_number()
            .val(obj.tel, 'tel').is_phone()
            .val(obj.mail, 'mail').is_mail()
            .val(obj.mobile, 'mobile').is_mobile()
        .end();
        delete c;
        return err;
    }

    //=====
    // sql + where + order + limit
    //=====
    this.list = function (req, res) {
        var sql = "select * from employees";
        var sqlc = "select count(id) as cnt from employees";
        var limit = " offset $1 limit $2";
        var where = null;
        var order = " order by id";

        var q = req.query;

        if (q.name) {
            where = " where name like '" + q.name + "%%'";
        }
        if ('id' in q) {
            if (where) {
                where += " and id = " + q.id;
            } else {
                where = " where id = " + q.id;
            }
        }
        if (q.department) {
            if (where) {
                where += " and department = " + q.department;
            } else {
                where = " where department = " + q.department;
            }
        }
        if (q.orderby) {
            order = " order by " + q.orderby;
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
        var sql = 'select * from employees where id=' + req.params.id;
        util.do_query(cli, sql, res);
    };

    this.post = function (req, res) {
        var p = req.body;
        var err = check_values(p);
        if (err) {
            res.send(dberr.invalid_input(err));
            return;
        }

        var sql = `insert into employees
            (name, department, mobile, tel, mail, position, role)
            values
            ($1, $2, $3, $4, $5, $6, $7) returning *;`;
        var val = [
            p.name || '',
            p.department || null,
            p.mobile || '',
            p.tel || '',
            p.mail || '',
            p.position || '',
            p.role || ''
        ];
        util.do_query(cli, {text: sql, values: val}, res);
    };

    this.put = function (req, res) {
        var p = req.body;
        var err = check_values(p);
        if (err) {
            res.send(dberr.invalid_input(err));
            return;
        }

        var sql = `update employees
            set name=$1, department=$2, mobile=$3, tel=$4, mail=$5, position=$6, role=$7
            where id = $8 returning *;`;
        var val = [
            req.body.name || '',
            req.body.department || null,
            req.body.mobile || '',
            req.body.tel || '',
            req.body.mail || '',
            req.body.position || '',
            req.body.role || '',
            req.body.id
        ];

        util.do_query(cli, {text: sql, values: val}, res);
    };

    this.del = function (req, res) {
        if (req.user_role != 1) {
            res.send(dberr.denied("only avaliable for admin"));
            return;
        }
        var sql = `delete from employees where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        util.do_query(cli, {text: sql, values: val}, res);
    };
};

/************************************* END **************************************/
