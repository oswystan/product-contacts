/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: checker.js
 *    description:
 *        created: 2017-01-01 18:39:19
 *         author: wystan
 *
 *********************************************************************************
 */


module.exports = function () {

    var reg_date = /^([0-9]{4})([\/.-])([0][1-9]|[1][0-2])([\/.-])([0-2][1-9]|[3][0-1])$/g;
    var reg_mail = /^([\w-.])+@([\w-])+\.(\w)+$/g;
    var reg_mobile = /^[+]*(\d){6,}$/g;
    var reg_phone = /^(\d){6,}$/g;

    this.begin = function () {
        this.ret = true;
        this.err = null;
        return this;
    };

    this.val = function (v, tag) {
        this.v = v;
        this.tag = tag;
        return this;
    };

    this.not_null = function () {
        if ( this.ret && (typeof this.v == 'undefined' || this.v == null)) {
            this.ret = false;
            this.err = this.tag + " is null";
        }
        return this;
    };

    this.not_empty = function() {
        if (this.ret && typeof this.v == 'string') {
            if (this.v.length == 0) {
                this.ret = false;
                this.err = this.tag + ' is empty';
            }
        }
        return this;
    };

    this.is_phone = function () {
        if (this.ret && this.v) {
            if (typeof this.v != "string" || !reg_phone.test(this.v)) {
                this.ret = false;
                this.err = this.tag + "=[" + this.v + "] is not a phone";
            }
        }
        return this;
    };

    this.is_mobile = function () {
        if (this.ret && this.v) {
            if (typeof this.v != "string" || !reg_mobile.test(this.v)) {
                this.ret = false;
                this.err = this.tag + "=[" + this.v + "] is not a mobile";
            }
        }
        return this;
    };

    this.is_mail = function () {
        if (this.ret && this.v) {
            if (typeof this.v != "string" || !reg_mail.test(this.v)) {
                this.ret = false;
                this.err = this.tag + "=[" + this.v + "] is not a mail";
            }
        }
        return this;
    }

    this.is_number = function () {
        if (this.ret && this.v && typeof this.v != 'number') {
            this.ret = false;
            this.err = this.tag + " is not a number";
        }
        return this;
    };

    this.is_string = function () {
        if (this.ret && typeof this.v != 'string') {
            this.ret = false;
            this.err = this.tag + " is not a string";
        }
        return this;
    };

    this.is_bool = function () {
        if (this.ret && this.v && typeof this.v != 'boolean') {
            this.ret = false;
            this.err = this.tag + " is not a bool";
        }
        return this;
    };

    this.end = function () {
       return this.err;
    }
};

/************************************* END **************************************/
