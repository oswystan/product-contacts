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
var deps = [
    "modules/database.js",
];

define(deps, function (db) {
    var mod = {
        bus: null,
        db: db,
    };
    _.extend(mod, Backbone.Events);

    var search = {
        name: "",
        tab:"",
        event: "",
    };
    var pagination = null;
    var get_pages = mod.db.pagination.get_pages;

    function do_list() {
        var url = "offset=" + pagination.offset + "&limit=" + pagination.limit;
        if (search.name !== "") {
            url += "&name=" + search.name;
        }
        mod.db[search.tab].list(url, function(data) {
            render_list(data);
        });
    }

    function render_list(res) {
        if (res == null) {
            res = {total: 0};
            search.name = "";
            pagination.cur_pg = 1;
            pagination.offset = 0;
        }
        if ('total' in res) {
            pagination.total = Math.ceil(res.total / pagination.limit);
        }
        pagination.pages = get_pages.call(pagination);
        res._search_ = search;
        res._pg_ = pagination;

        var html = template('diag', res);

        var mask = $('#diag_mask');
        var diag = $('#diag_selector');
        mask.show();
        diag.html(html).show();
        diag.find('input[name="key_val"]').unbind('change').change(function(){
            search.name = this.value;
        });
        diag.find('[autofocus="autofocus"]').focus().select();

        diag.find('input[name="search"]').unbind('click').click(function() {
            do_list();
            return false;
        });

        diag.find('input[name="confirm"]').unbind('click').click(function(event) {
            var val = diag.find('input[type="radio"]:checked').val();
            if (val == undefined) {
                mod.bus.trigger("hint", "NO record selected!");
                return false;
            }
            diag.hide();
            mask.hide();
            mod.bus.trigger(search.event, val);
        });

        diag.find('input[name="cancel"]').unbind('click').click(function() {
            diag.hide();
            mask.hide();
        });

        diag.find('a[name="page"]').unbind('click').click(function(event) {
            var page = Number.parseInt($(this).attr("value"));
            if (page < 0) {
                page = pagination.total;
                if (page == 0) {
                    page = 1;
                }
            }
            pagination.cur_pg = page;
            pagination.offset = (page - 1) * pagination.limit;
            console.log("goto page =>" + page);
            do_list();
        });
    }

    function render_employee() {
        search.tab = "employees";
        search.event = "employee_selected";
        render_list(null);
    }
    function render_department() {
        search.tab = "departments";
        search.event = "department_selected";
        render_list(null);
    }

    return {
        init: function (eb) {
            mod.bus = eb;
            mod.listenTo(eb, "diag_employee", render_employee);
            mod.listenTo(eb, "diag_department", render_department);
            pagination = new mod.db.pagination();
        },
    };
});




/************************************* END **************************************/
