/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: config.js
 *    description:
 *        created: 2017-01-01 17:17:41
 *         author: wystan
 *
 *********************************************************************************
 */

var fs = require("fs");

module.exports = function() {
    this.dbname   = "contacts";
    this.user     = "pg_contacts";
    this.password = "123456";
    this.max_rows = 4;

    var content = fs.readFileSync(__dirname + "/../../config/db.json", {encoding: "utf8"});
    if (content) {
        var c = JSON.parse(content);
        this.dbname   = c.db;
        this.user     = c.user;
        this.password = c.password;
        this.max_rows = c.max_rows;
    }
};


/************************************* END **************************************/
