/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: db.js
 *    description: 
 *        created: 2016-12-31 22:04:35
 *         author: wystan
 *
 *********************************************************************************
 */

var pg = require('pg');
var employee = require('./employee');
var department = require('./department');

exports = module.exports = function (){
    this.connect = function () {
        var client = new pg.Client({
            user:'pg_contacts',
            password: '123456',
            database: 'contacts',
        });
        client.connect();

        this.cli = client;
        this.employees = new employee(this.cli);
        this.departments = new department(this.cli);
    };
};

/************************************* END **************************************/
