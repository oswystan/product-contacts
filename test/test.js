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

describe('contacts', function () {
    var root = "http://localhost:8000";
    describe('# /', function () {
        it("GET /", function (done) {
            chai.request(root)
                .get("/")
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.be.html;
                    done();
                });
        });

        it("can NOT POST /", function (done) {
            chai.request(root)
                .get("/")
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                });
        });
    });
    describe("# /e", function () {
        var url = "/e";

        it('GET', function (done) {
            chai.request(root)
                .get(url)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('POST', function (done) {
            chai.request(root)
                .post(url)
                .send({
                    name: "laowang",
                    department: 1,
                    mobile: "123456789",
                    tel: "123456",
                    position: "#3-1-1",
                    role: "swe"
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('PUT');
        it('DELETE');
    });

    describe("# /d", function () {
        it('GET');
        it('POST');
        it('PUTT');
        it('DELETE');
    });

    describe("# /query", function () {
        it('GET');
    });
});

/************************************* END **************************************/
