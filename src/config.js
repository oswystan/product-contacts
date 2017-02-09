/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: config.js
 *    description:
 *        created: 2017-02-09 16:42:16
 *         author: wystan
 *
 *********************************************************************************
 */

module.exports = function () {
    var user_db = [
        {user: "guest", password: "guest",  role: 0},
        {user: "admin", password: "admin0", role: 1}
    ];
    var db_cfg = {
        dbname   : "contacts",
        user     : "contacts_admin",
        password : "123456",
        max_rows : 15,
    };
    return {
        user: user_db,
        db: db_cfg
    };
}

/************************************* END **************************************/
