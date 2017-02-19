/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: selector.js
 *    description:
 *        created: 2017-02-18 19:43:27
 *         author: wystan
 *
 *********************************************************************************
 */

define(function () {
    var mod = {
        bus: null,
    };
    _.extend(mod, Backbone.Events);

    function render() {
        var mask = $('#diag_mask');
        var diag = $('#diag_employee');
        mask.show();
        diag.show();
        diag.find('input[name="key_val"]').val('');
        diag.find('[autofocus="autofocus"]').focus().select();

        diag.find('input[name="confirm"]').unbind('click').click(function(event) {
            diag.hide();
            mask.hide();
        });

        diag.find('input[name="search"]').unbind('click').click(function() {
            return false;
        });

        diag.find('input[name="cancel"]').unbind('click').click(function() {
            diag.hide();
            mask.hide();
        });
    }

    return {
        init: function (eb) {
            mod.bus = eb;
            mod.listenTo(eb, "diag_employee", render);
            mod.listenTo(eb, "diag_department", render);
        },
    };
});




/************************************* END **************************************/
