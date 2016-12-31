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

    this.list = function (req, res) {
        var sql = 'select * from departments';
        this.client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
        });
    };

    this.get = function (req, res) {
        var sql = 'select * from departments where id=' + req.params.id;
        this.client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows[0]);
            } else {
                res.send({});
            }
        });
    };

    this.post = function (req, res) {
        var sql = `insert into departments (name, leader)
            values ($1, $2) returning *;`;
        var val = [
            req.body.name || '', 
            req.body.leader || 0, 
        ];

        this.client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
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

        this.client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    };

    this.del = function (req, res) {
        var sql = `delete from departments where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        this.client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    };
};

/************************************* END **************************************/
