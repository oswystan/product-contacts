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

    this.begin = function () {
        this.ret = true;
        this.err = null;
        return this;
    };

    this.val = function (v, tag) {
        this.v = v;
        this.tag = tag;
        return this;
    }

    this.not_null = function () {
        if ( this.ret && (typeof this.v == 'undefined' || this.v == null)) {
            this.ret = false;
            this.err = this.tag + " is null";
        }
        return this;
    }; 

    this.is_phone = function () {
        if (this.ret && this.v && typeof this.v != 'string') {
            this.ret = false;
            this.err = this.tag + " is not a phone number";
        }
        return this;
    };

    this.is_number = function () {
        if (this.ret && this.v && typeof this.v != 'number') {
            this.ret = false;
            this.err = this.tag + " is not a number";
        }
        return this;
    };

    this.is_string = function () {
        if (this.ret && this.v && typeof this.v != 'string') {
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
