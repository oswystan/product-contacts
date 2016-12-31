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

const max_rows = 15;

exports = module.exports = function (cli) {
    this.client = cli;

    function query(sql, res) {
        cli.query(sql, function (err, result) {
            if (err) {
                res.send(err);
                return;
            }
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
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
            max(req.query.limit, max_rows), 
        ];
        
        query({text: sql, values: val}, res);
    };

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

        query({text: sql, values: val}, res);
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
