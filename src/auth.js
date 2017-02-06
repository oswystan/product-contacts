/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: auth.js
 *    description:
 *        created: 2017-01-05 11:58:19
 *         author: wystan
 *
 *********************************************************************************
 */

var basic_auth = require('basic-auth-connect');
var user_db = require('./config')().user;

module.exports = function() {
    /*
    var user_db = [
        {user: "guest", password: "guest",  role: 0},
        {user: "admin", password: "admin0", role: 1}
    ];
    */

    return function (req, res, next) {
        function check(user, pass) {
            for (var i = 0, l = user_db.length; i < l; i++) {
                var v = user_db[i];
                if (v.user == user && v.password == pass) {
                    req.user_role = v.role;
                    return true;
                }
            }
            return false
        }

        var auth = basic_auth(check);
        auth(req, res, next);
    }
};

/************************************* END **************************************/
