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
    succ: function (d) {
        return {err: 0x00, desc: "success", data: d};
    },
    error: function (code, str_desc) {
        return {err: code, desc: str_desc, data: []};
    },
    db_internal: function (e) {
        return {err: e.code, desc: e.routine, data: []};
    },

    no_such_table: function() {
        return {err:  0x01, desc: "no such table", data: []};
    },

    no_such_records: function () {
        return { err:  0x02, desc: "no such records", data: [] };   
    },

    invalid_input: function (s){
        return {err:  0x03, desc: s ? s :"invalid input", data: []};
    },

    unknown_err: function (){
        return {err: 0xFF, desc: "unknown error!", data: []};
    },
};


/************************************* END **************************************/
