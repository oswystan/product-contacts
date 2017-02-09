/*
 *********************************************************************************
 *                     Copyright (C) 2016 wystan
 *
 *       filename: router.js
 *    description:
 *        created: 2016-12-31 19:11:58
 *         author: wystan
 *
 *********************************************************************************
 */

var ctrl = require('./controller');
var auth = require('./auth');

exports = module.exports = {
    init: function (app) {
        ctrl.init();

        app.post("/login", auth.login);
        app.get("/logout", auth.logout);

        app.post("/query", function (req, res) {
            ctrl.query(req, res);
        });

        app.get('/e/:id', function (req, res) {
            ctrl.get('employees', req, res);
        });

        app.get('/e', function (req, res) {
            ctrl.list('employees', req, res);
        });

        app.post('/e', function (req, res) {
            ctrl.post('employees', req, res);
        });

        app.put('/e', function (req, res) {
            ctrl.put('employees', req, res);
        });

        app.delete('/e', function (req, res) {
            ctrl.del('employees', req, res);
        });

        app.get('/d/:id', function (req, res) {
            ctrl.get('departments', req, res);
        });

        app.get('/d', function (req, res) {
            ctrl.list('departments', req, res);
        });

        app.post('/d', function (req, res) {
            ctrl.post('departments', req, res);
        });

        app.put('/d', function (req, res) {
            ctrl.put('departments', req, res);
        });

        app.delete('/d', function (req, res) {
            ctrl.del('departments', req, res);
        });
    },
};

/************************************* END **************************************/
