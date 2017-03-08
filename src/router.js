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

exports = module.exports = {
    init: function(app) {
        ctrl.init();

        app.post("/api/upload/db", function (req, res) {
            ctrl.upload(req, res);
        });

        app.post("/api/upload/avatar", function (req, res) {
            ctrl.avatar(req, res);
        });

        app.post("/api/auth", function(req, res) {
            ctrl.auth(req, res);
        });
        app.post("/api/query", function(req, res) {
            ctrl.query(req, res);
        });

        app.get('/api/e/:id', function(req, res) {
            ctrl.get('employees', req, res);
        });

        app.get('/api/e', function(req, res) {
            ctrl.list('employees', req, res);
        });

        app.post('/api/e', function(req, res) {
            ctrl.post('employees', req, res);
        });

        app.put('/api/e', function(req, res) {
            ctrl.put('employees', req, res);
        });

        app.delete('/api/e', function(req, res) {
            ctrl.del('employees', req, res);
        });

        app.get('/api/d/:id', function(req, res) {
            ctrl.get('departments', req, res);
        });

        app.get('/api/d', function(req, res) {
            ctrl.list('departments', req, res);
        });

        app.post('/api/d', function(req, res) {
            ctrl.post('departments', req, res);
        });

        app.put('/api/d', function(req, res) {
            ctrl.put('departments', req, res);
        });

        app.delete('/api/d', function(req, res) {
            ctrl.del('departments', req, res);
        });
    },
};

/************************************* END **************************************/
