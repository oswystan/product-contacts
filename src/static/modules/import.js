/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: import.js
 *    description:
 *        created: 2017-02-22 17:21:34
 *         author: wystan
 *
 *********************************************************************************
 */


define(function() {
    var mod = {};
    _.extend(mod, Backbone.Events);

    function render() {
        var html = template("import");
        $("#main").html(html);
    }

    return {
        init: function(eb) {
            mod.listenTo(eb, "import", render);
        },
    };
});





/************************************* END **************************************/
