/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: test.js
 *    description:
 *        created: 2017-01-02 20:07:29
 *         author: wystan
 *
 *********************************************************************************
 */

var chai = require('chai');
var chttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
chai.use(chttp);
chai.config.showDiff = true;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var token = null;

var root = "https://localhost:8000";

describe('home', function () {
    it("GET /", function (done) {
        chai.request(root)
            .get("/")
            .auth('admin', 'admin0')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.html;
                done();
            });
    });

    it("can NOT POST /", function (done) {
        chai.request(root)
            .get("/")
            .auth('admin', 'admin0')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });

});

describe('auth', function () {
    var url = "/api/auth";

    it('POST', function (done) {
        chai.request(root)
            .post(url)
            .send({
                username: "admin",
                password: "admin0"
            })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body.err).to.equal(0);
            token = res.body.data;
            done();
        });

    });
});

describe('employee', function () {
    var url = "/api/e";
    var d = {};

    it('GET', function (done) {
        chai.request(root)
            .get(url)
            .set("Authorization", "Bearer " + token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                done();
            });
    });

    it('POST', function (done) {
        chai.request(root)
            .post(url)
            .set("Authorization", "Bearer " + token)
            .send({
                name: "laowang",
                mobile: "123456789",
                tel: "123456",
                position: "#3-1-1",
                role: "swe"
            })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body.err).to.equal(0);
            expect(res.body.data.length).to.equal(1);
            d = res.body.data[0];
            done();
        });
    });

    it('PUT', function (done) {
        chai.request(root)
            .put(url)
            .set("Authorization", "Bearer " + token)
            .send(d)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
    it('DELETE', function (done) {
        chai.request(root)
            .delete(url)
            .set("Authorization", "Bearer " + token)
            .send(d)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
});


describe('department', function () {
    var url = "/api/d";
    var d = {};

    it('GET', function (done) {
        chai.request(root)
            .get(url)
            .set("Authorization", "Bearer " + token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.be.least(0);
                done();
            });
    });
    it('POST', function (done) {
        chai.request(root)
            .post(url)
            .set("Authorization", "Bearer " + token)
            .send({
                name: "RnD"
            })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body.err).to.equal(0);
            expect(res.body.data.length).to.equal(1);
            d = res.body.data[0];
            done();
        });
    });
    it('PUT', function (done) {
        chai.request(root)
            .put(url)
            .set("Authorization", "Bearer " + token)
            .send(d)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
    it('DELETE', function (done) {
        chai.request(root)
            .delete(url)
            .set("Authorization", "Bearer " + token)
            .send(d)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
});

describe('advanced query', function () {
    var url = "/api/query";
    var d = {
        tab: "employees",
        fields: "*",
        where: "1=1",
        orderby: "id asc",
        offset: 0,
        limit: 10
    };
    it('POST', function (done) {
        chai.request(root)
            .post(url)
            .set("Authorization", "Bearer " + token)
            .send(d)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.err).to.equal(0);
                expect(res.body.data.length).to.be.least(0);
                done();
            });
    });
});

/************************************* END **************************************/
