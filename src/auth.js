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

var auth = function () {
    return function (req, res, next) {
        if (req.path == "/login" || req.path == "/logout" || req.path == "/login.html") {
            next();
            return;
        }
        if (!req.session || !req.session.user) {
            return res.redirect("/login.html");
        } else {
            next();
        }
    }
};

function login(req, res) {
    for (var i = 0, l = user_db.length; i < l; i++) {
        if (user_db[i].user == req.body.username &&
            user_db[i].password == req.body.password) {
            req.session.user = req.body.username;
            req.session.role = user_db[i].role;
            return res.redirect("/");
        }
    }
    return res.redirect("/login.html");
};
function logout(req, res) {
    req.contacts.user = null;
    req.contacts.role = null;
    res.redirect("/login.html");
};

module.exports = {
    auth: auth,
    login: login,
    logout: logout
};

/************************************* END **************************************/
