var deps = [
    "modules/database.js",
];

define(deps, function(db) {
    var mod = {
        bus: null,
        token: null,
        db: db,
    };
    _.extend(mod, Backbone.Events);

    var last_list = {};
    var last_model = {};
    var model = function() {
        this.id = "#";
        this.name = "";
        this.leader = "";
    };
    var new_model = new model();
    var search = {
        type: "name",
        val: "",
    };
    var pagination = null;
    var get_pages = mod.db.pagination.get_pages;

    //=================================
    // utils
    //=================================
    function token(t) {
        mod.token = t;
    }

    function change_dt(m) {
        if (typeof m.leader == "string") {
            m.leader = Number.parseInt(m.leader);
        }
    }

    //=================================
    // module entrance
    //=================================
    mod.list = function() {
        mod.render_list(last_list);
    };
    mod.post = function() {
        mod.render(new_model);
    };
    mod.put = function(id) {
        mod.do_get(id);
    };

    //================================
    // GUI operations
    //================================
    mod.do_list = function() {
        console.log("do list");
        var url = "offset=" + pagination.offset + "&limit=" + pagination.limit;
        if (search.type == "name" && search.val != "") {
            url += "&name=" + search.val;
        } else if (search.type == "ID" && search.val != "") {
            url += "&id=" + search.val;
        }
        mod.db.departments.list(url, function (data) {
            mod.render_list(data);
        });
    };
    mod.do_get = function (id) {
        mod.db.departments.get(id, function (data) {
            mod.render(data.data[0]);
        });
    }
    mod.do_post = function() {
        console.log("department=> do post");
        change_dt(new_model);
        mod.db.departments.post(new_model, function (data) {
            mod.render(data.data[0]);
            new_model = new model();
        });
        return false;
    };
    mod.do_put = function() {
        console.log("department=> do put");
        change_dt(last_model);
        mod.db.departments.put(last_model, function (data) {
            mod.render(data.data[0]);
        });
        return false;
    };
    mod.do_del = function(dl) {
        console.log("department=> do del");
        if (dl.length == 0) {
            mod.bus.trigger("hint", "no records selected!");
        }
        mod.db.departments.del(dl, function () {
            mod.do_list();
        });
    };
    mod.leader_selected = function(id) {
        last_model.leader = id;
        mod.render(last_model);
    };

    //===============================
    // view render
    //===============================
    mod.render_list = function(res) {
        if (res.total) {
            pagination.total = Math.ceil(res.total / pagination.limit);
        }
        pagination.pages = get_pages.call(pagination);
        res._search_ = search;
        res._pg_ = pagination;
        last_list = res;

        var html = template("list-department", res);
        var main = $("#main");
        main.html(html);
        main.find('input[name="search_by"]').unbind('click').click(function() {
            search.type = this.value;
            search.val = "";
            main.find('input[name="key_val"]').val("");
        });
        main.find('[name="key_val"]').unbind('change').change(function() {
            search.val = this.value;
        });
        main.find('input[name="search"]').unbind('click').click(function() {
            pagination.offset = 0;
            pagination.cur_pg = 1;
            mod.do_list();
            return false;
        });
        main.find('a[name="del"]').unbind('click').click(function() {
            var dl = [];
            main.find(':checkbox[name!="select_all"]').each(function() {
                if ($(this).is(":checked")) {
                    dl.push(this.value);
                }
            });
            mod.do_del(dl);
        });

        main.find(':checkbox[name="select_all"]').unbind('click').click(function(event) {
            if ($(this).is(":checked")) {
                main.find(':checkbox[name!="select_all"]').prop("checked", true);
            } else {
                main.find(':checkbox[name!="select_all"]').prop("checked", false);
            }
        });
        main.find('a[name="page"]').unbind('click').click(function(event) {
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
            mod.do_list();
        });
        main.find('[autofocus="autofocus"]').focus().select();
    };
    mod.render = function(m) {
        var html = template("department", m);
        var main = $("#main");
        main.html(html);
        main.find('input[type="text"]').unbind('change').change(function() {
            m[this.name] = this.value;
        });

        if (m.id == "#") {
            main.find('input[type="submit"]').unbind('click').click(mod.do_post);
        } else {
            main.find('input[type="submit"]').unbind('click').click(mod.do_put);
        }

        main.find('input[name="modify"]').unbind('click').click(function() {
            main.find('input[type="text"]').prop("disabled", false);
        });

        main.find('input[name="select_leader"]').unbind('click').click(function() {
            mod.bus.trigger("diag_employee");
        });

        last_model = m;
    };

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "department.list", mod.list);
            mod.listenTo(eb, "department.post", mod.post);
            mod.listenTo(eb, "department.put", mod.put);
            mod.listenTo(eb, "employee_selected", mod.leader_selected);
            mod.listenTo(eb, "token", token);
            mod.db.init(eb);
            pagination = new mod.db.pagination();
        }
    };
});
