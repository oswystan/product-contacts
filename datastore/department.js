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

exports = module.exports = function (cli) {
    var cfg = cli.cfg

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

    this.list = function (req, res) {
        var sql = `select * from departments
            offset $1 limit $2;`;

        var val = [
            req.query.offset || 0, 
            max(req.query.limit, cfg.max_rows), 
        ];
        
        query({text: sql, values: val}, res);
    };
    this.count = function (id, done) {
        var sql = 'select count(id) as cnt from employees where id=' + id;
        cli.query(sql, done);
    },

    this.get = function (req, res) {
        var sql = 'select * from departments where id=' + req.params.id;
        query(sql, res);
    };

    this.post = function (req, res) {
        var sql = `insert into departments (name, leader)
            values ($1, $2) returning *;`;
        var val = [
            req.body.name || '', 
            req.body.leader || 0, 
        ];

        function done(err, result) {
            if (err) {
                res.send(dberr.db_internal(err));
            } else {
                if (result.rows[0].cnt <= 0) {
                    res.send(dberr.invalid_input());
                    return;
                }
                query({text: sql, values: val}, res);
            }
        }
        this.count(req.body.leader, done);
    };

    this.put = function (req, res) {
        var sql = `update departments 
            set name=$1, leader=$2
            where id = $3 returning *;`;
        var val = [
            req.body.name || '', 
            req.body.leader || 0, 
            req.body.id
        ];

        query({text: sql, values: val}, res);
    };

    this.del = function (req, res) {
        var sql = `delete from departments where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        query({text: sql, values: val}, res);
    };
};

/************************************* END **************************************/
