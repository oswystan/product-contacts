/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: utils.js
 *    description: 
 *        created: 2017-01-03 15:53:09
 *         author: wystan
 *
 *********************************************************************************
 */

var dberr = require('./error');

module.exports = Util = {
    max: function (a, b) {
        return a > b ? a : b;
    },

    trim_result: function (rows) {
        for (var i = 0, l = rows.length; i < l; i++) {
            var v = rows[i];
            for (var p in v) {
                if(typeof v[p] == "string") {
                    v[p] = v[p].trim();
                }
            }
        }
    },
    do_query: function (cli, sql, res) {
        cli.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.send(dberr.db_internal(err));
                return;
            }
            Util.trim_result(result.rows);
            res.send(dberr.succ(result.rows));
        });
    }
};

/************************************* END **************************************/