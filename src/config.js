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

module.exports = function() {
    var user_db = [{
        user: "guest",
        password: "guest",
        role: 0
    }, {
        user: "admin",
        password: "admin0",
        role: 1
    }];
    var db_cfg = {
        dbname: "contacts",
        user: "contacts_admin",
        password: "123456",
        max_rows: 15,
    };
    var jwt_cfg = {
        secret: "contacts_secret", // TODO change this for your own secret
        def_exp: 24 * 60 * 60, // TODO default 24hours
    };
    var server_cfg = {
        port: 8000
    };
    var upload_cfg = {
        max_size: 1 * 1024 * 1024,
        path: __dirname + "/../upload",
    };
    return {
        user: user_db,
        db: db_cfg,
        jwt: jwt_cfg,
        srv: server_cfg,
        upload: upload_cfg,
    };
}

/************************************* END **************************************/
