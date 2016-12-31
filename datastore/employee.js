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
        var sql = 'select * from employees';
        query(sql, res);
    };

    this.get = function (req, res) {
        var sql = 'select * from employees where id=' + req.params.id;
        query(sql, res);
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
        query({text: sql, values: val}, res);
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
