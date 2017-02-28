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
var deps = [
    "modules/database.js",
];

define(deps, function(db) {
    var mod = {
        bus: null,
        db: db,
    };
    _.extend(mod, Backbone.Events);

    function do_upload() {
        console.log("do upload");
        var form_data = new FormData($('#upload_form')[0]);
        db.upload.post(form_data, function() {
            console.log("success");
        });
        return false;
    }

    function render() {
        var html = template("import");
        $("#main").html(html);
        var main = $("#main");
        main.find('input[type="submit"]').unbind('click').click(do_upload);
    }

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "import", render);
        },
    };
});

/************************************* END **************************************/
