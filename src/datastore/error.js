/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: error.js
 *    description:
 *        created: 2017-01-01 07:20:49
 *         author: wystan
 *
 *********************************************************************************
 */

module.exports = {
    succ: function (d, t) {
        if (!t) {
            return {err: 0, desc: "success", data: d};
        } else {
            return {err: 0, desc: "success", total: t, data: d};
        }
    },
    error: function (code, str_desc) {
        return {err: code, desc: str_desc, data: []};
    },
    db_internal: function (e) {
        return {err: e.code, desc: e.message, data: []};
    },

    no_such_table: function(s) {
        return {err: 1, desc: "no such table " + (s ? s : "!"), data: []};
    },

    no_such_records: function () {
        return { err:2, desc: "no such records", data: [] };
    },

    invalid_input: function (s){
        return {err: 3, desc: s ? s :"invalid input", data: []};
    },

    denied: function (s){
        return {err: 4, desc: s ? s :"permission denied !", data: []};
    },
    unauth_usr: function (s){
        return {err: 5, desc: s ? s :"invalid username or password", data: []};
    },

    unknown_err: function (){
        return {err:255,  desc: "unknown error!", data: []};
    },
};


/************************************* END **************************************/
