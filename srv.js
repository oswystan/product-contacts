#!/usr/bin/env node
/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: module.js
 *    description: 
 *        created: 2016-03-28 23:00:17
 *         author: wystan
 *
 *********************************************************************************
 */

var express = require('express');
var pg = require('pg');
var bodyparser = require("body-parser");
var log = require('log4js').getLogger("contacts");
var app = express();
var client = new pg.Client({
    user:'pg_contacts',
    password: '123456',
    database: 'contacts',
});



function main() {
    client.connect();
    app.use(bodyparser.json());

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/e/:id', function (req, res) {
        var sql = 'select * from employees where id=' + req.params.id;
        client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows[0]);
            } else {
                res.send({});
            }
        });
    });

    app.get('/e', function (req, res) {
        var sql = 'select * from employees';
        client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
        });
    });

    app.post('/e', function (req, res) {
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

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    app.put('/e', function (req, res) {
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

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    app.delete('/e', function (req, res) {
        var sql = `delete from employees where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    //================================
    // departments operations
    //================================
    app.get('/d', function (req, res) {
        var sql = 'select * from departments';
        client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows);
            } else {
                res.send({});
            }
        });
    });

    app.get('/d/:id', function (req, res) {
        var sql = 'select * from departments where id=' + req.params.id;
        client.query(sql, function (err, result) {
            if (result.rows.length) {
                res.send(result.rows[0]);
            } else {
                res.send({});
            }
        });
    });


    app.post('/d', function (req, res) {
        var sql = `insert into departments (name, leader)
        values ($1, $2) returning *;`;
        var val = [
            req.body.name || '', 
            req.body.leader || 0, 
        ];

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    app.put('/d', function (req, res) {
        var sql = `update departments 
        set name=$1, leader=$2
        where id = $3 returning *;`;
        var val = [
            req.body.name || '', 
            req.body.leader || 0, 
            req.body.id
        ];

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    app.delete('/d', function (req, res) {
        var sql = `delete from departments where id=$1 returning *;`;
        var val = [
            req.body.id
        ];

        client.query({text: sql, values: val}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.rows[0]);
            }
        });
    });

    log.info('contacts server started ...');
    app.listen(8000);
}

main();

/************************************END****************************************/
