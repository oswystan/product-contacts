define(function() {
    var mod = {
        bus: null,
    };
    _.extend(mod, Backbone.Events);

    var last_list = {};
    var last_model = {};
    var model = function() {
        this.id = "#";
        this.name = "";
        this.tel = "";
        this.mobile = "";
        this.mail = "";
        this.position = "";
        this.role = "";
        this.department = "";
    };
    var new_model = new model();
    var search = {
        type: "name",
        val: "",
    };
    var pagination = {
        total: 0,
        offset: 0,
        limit: 10,
        cur_pg: 1,
        pages:[],
        max: 5,
    };

    //=================================
    // utils
    //=================================
    function ajax_fail () {
        var res = {
            err: -1,
            desc: "connection error",
        };
        mod.bus.trigger("error", res);
    };
    function hint(s) {
        mod.bus.trigger("hint", s);
    }
    function change_dt(m) {
        if (typeof m.department == "string") {
            m.department = Number.parseInt(m.department);
        }
    }
    function get_pages() {
        var pg = [];
        var half = Math.floor(pagination.max/2);
        var start = 1;
        if (pagination.cur_pg - half > 0) {
            start = pagination.cur_pg - half;
        }

        var cnt = pagination.max;
        if (pagination.total-start+1 < pagination.max) {
            cnt = pagination.total-start+1;
        }
        for (var i = 0; i < cnt; i++) {
            pg.push(start+i);
        }
        return pg;
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
    mod.put = function (id) {
        var url = "/e/" + id;
        mod.db_get(url);
    };

    //=================================
    // back-end database operation
    //=================================
    mod.db_list = function (url) {
        $.get({
            url: url,
            data: null,
            success: function(res, status, xhr) {
                mod.render_list(res);
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };
    mod.db_get = function (url) {
        $.get({
            url: url,
            data: null,
            success: function(res, status, xhr) {
                if (res.data.length > 0) {
                    mod.render(res.data[0]);
                }
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };
    mod.db_post = function (data) {
        var url = "/e";
        $.post({
            url: url,
            data: JSON.stringify(data),
            contentType: "Application/json",
            success: function(res, status, xhr) {
                if (res.data.length > 0) {
                    mod.render(res.data[0]);
                    new_model = new model();
                    hint("success");
                } else {
                    mod.bus.trigger("error", res);
                }
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };
    mod.db_put = function (data) {
        var url = "/e";
        $.ajax({
            url: url,
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(res, status, xhr) {
                if (res.data.length > 0) {
                    mod.render(res.data[0]);
                    hint("success");
                } else {
                    mod.bus.trigger("error", res);
                }
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };
    mod.db_del = function (data) {
        var url = "/e";
        var dl = [];
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: url,
                type: "DELETE",
                async: false,
                data: JSON.stringify({"id": data[i]}),
                contentType: "application/json",
                success: function(res, status, xhr) {
                    if (res.data.length > 0) {
                        dl.push(res.data[0].id);
                    } else {
                        console.log(res);
                    }
                },
            }).fail(function(xhr, status) {
                console.log(xhr);
            });
        }

        if (dl.length == data.length) {
            hint("total " + dl.length + " records deleted.");
            mod.do_list();
        } else {
            mod.bus.trigger('error', {err: -1, desc: "NOT all operations succeed"});
        }
    };

    //================================
    // GUI operations
    //================================
    mod.do_list = function () {
        console.log("do list");
        console.log(search);
        var url = "/e?offset=" + pagination.offset + "&limit=" + pagination.limit;
        if (search.type == "name" && search.val != "") {
            url += "&name=" + search.val;
        } else if (search.type == "ID" && search.val != "") {
            url += "&id=" + search.val;
        }
        mod.db_list(url);
    };
    mod.do_get = function () {
    };
    mod.do_post = function () {
        console.log("employee=> do post");
        console.log(new_model);
        change_dt(new_model);
        mod.db_post(new_model);
        return false;
    };
    mod.do_put = function () {
        console.log("employee=> do put");
        change_dt(last_model);
        console.log(last_model);
        mod.db_put(last_model);
        return false;
    };
    mod.do_del = function (dl) {
        console.log("employee=> do del");
        console.log(dl);
        if (dl.length == 0) {
            hint("NO records selected");
            return;
        }
        mod.db_del(dl);
    };

    //===============================
    // view render
    //===============================
    mod.render_list = function(res) {
        if (res.total) {
            pagination.total = Math.ceil(res.total / pagination.limit);
        }
        pagination.pages = get_pages();
        res._search_ = search;
        res._pg_ = pagination;
        last_list = res;

        var html = template("list-employee", res);
        var main = $("#main");
        main.html(html);
        main.find('input[name="search_by"]').unbind('click').click(function () {
            search.type = this.value;
            search.val = "";
            main.find('input[name="key_val"]').val("");
        });
        main.find('[name="key_val"]').unbind('change').change(function() {
            search.val = this.value;
        });
        main.find('input[name="search"]').unbind('click').click(function(){
            pagination.offset = 0;
            pagination.cur_pg = 1;
            mod.do_list();
            return false;
        });
        main.find('a[name="del"]').unbind('click').click(function(){
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
        main.find('a[name="page"]').unbind('click').click(function (event) {
            var page = Number.parseInt($(this).attr("value"));
            if (page < 0) {
                page = pagination.total;
                if (page == 0) {
                    page = 1;
                }
            }
            pagination.cur_pg = page;
            pagination.offset = (page-1)*pagination.limit;
            console.log("goto page =>" + page);
            mod.do_list();
        });
    };
    mod.render = function(m) {
        var html = template("employee", m);
        var main = $("#main");
        main.html(html);
        main.find('input[type="text"]').unbind('blur').blur(function() {
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

        last_model = m;
    };

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "employee.list", mod.list);
            mod.listenTo(eb, "employee.post", mod.post);
            mod.listenTo(eb, "employee.put", mod.put);
        }
    };
});
