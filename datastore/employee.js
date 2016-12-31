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

exports = module.exports = function (cli) {
    this.client = cli;

    this.list = function (req, res) {
        var sql = 'select * from employees';
        this.client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
        });
    };

    this.get = function (req, res) {
        var sql = 'select * from employees where id=' + req.params.id;
        this.client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows[0]);
            } else {
                res.send({});
            }
        });
    };

    this.post = function (req, res) {
        var sql = `insert into employees 
            (name, department, mobile, tel, mail, position, role) 
            values 
            ($1, $2, $3, $4, $5, $6, $7) returning *;`;
        var val = [
            req.body.name || '', 
            req.body.department || 0, 
            req.body.mobile || '', 
            req.body.tel || '',
            req.body.mail || '',
            req.body.position || '',
            req.body.role || ''
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

        this.client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    };

    this.del = function (req, res) {
        var sql = `delete from employees where id=$1 returning *;`;
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
