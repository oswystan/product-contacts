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

exports = module.exports = function (cli) {
    this.client = cli;
    var cfg = cli.cfg;

    function query(sql, res) {
        cli.query(sql, function (err, result) {
            if (err) {
                res.send(dberr.db_internal(err));
                return;
            }
            res.send(dberr.succ(result.rows));
        });
    }

    function max(val, max_val) {
        return val && val <= max_val ? val : max_val;
    }

    function check_values(obj) {
        var c = new checker();
        var err = 
        c.begin()
            .val(obj.name, 'name').not_null()
            .val(obj.department, 'department').not_null().is_number()
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
        var limit = " offset $1 limit $2";
        var where = null;
        var order = " order by id";

        var q = req.query;

        if (q.name) {
            where = " where name like '" + q.name + "%%'";
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

        if (where) {
            sql += where;
        }
        sql += order;
        sql += limit;

        var val = [
            q.offset || 0, 
            max(q.limit, cfg.max_rows),
        ];

        query({text: sql, values: val}, res);
    };

    this.get = function (req, res) {
        var sql = 'select * from employees where id=' + req.params.id;
        query(sql, res);
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
            p.department || 0,
            p.mobile || '', 
            p.tel || '',
            p.mail || '',
            p.position || '',
            p.role || ''
        ];
        query({text: sql, values: val}, res);
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
            req.body.department || 0, 
            req.body.mobile || '', 
            req.body.tel || '',
            req.body.mail || '',
            req.body.position || '',
            req.body.role || '',
            req.body.id
        ];

        query({text: sql, values: val}, res);
    };

    this.del = function (req, res) {
        var sql = `delete from employees where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        query({text: sql, values: val}, res);
    };
};

/************************************* END **************************************/
