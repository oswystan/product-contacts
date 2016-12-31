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

exports = module.exports = function (cli) {
    this.client = cli;

    function query(sql, res) {
        cli.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
        });
    }

    this.list = function (req, res) {
        var sql = 'select * from departments';
        query(sql, res);
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
