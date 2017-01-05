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

module.exports = function() {
    var user_db = [
        {user: "guest", password: "guest",  role: 0},
        {user: "admin", password: "admin0", role: 1}
    ];
    this.auth = function (user, pwd) {
        for (var i = 0, l = user_db.length; i < l; i++) {
            var v = user_db[i];

            if (v.user == user && v.password == pwd) {
                return true;
            }
        }
        return false
    };
};

/************************************* END **************************************/
