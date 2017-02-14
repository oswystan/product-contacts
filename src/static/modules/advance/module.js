define(function() {
    var mod = {
        bus: null,
        token: null
    };
    var last_list = {
        data: [],
    };
    var search = {
        fields: "",
        tab: "",
        where: "",
        orderby: "",
        offset: 0,
        limit: 10,
    };
    var pagination = {
        total: 0,
        cur_pg: 1,
        pages: [],
        max: 5,
    };
    _.extend(mod, Backbone.Events);

    //==========================
    // utils
    //==========================
    function ajax_fail() {
        var res = {
            err: -1,
            desc: "pls check the network !",
        };
        mod.bus.trigger("error", res);
    };

    function hint(s) {
        mod.bus.trigger("hint", s);
    }

    function get_pages() {
        var pg = [];
        var half = Math.floor(pagination.max / 2);
        var start = 1;
        if (pagination.cur_pg - half > 0) {
            start = pagination.cur_pg - half;
        }

        var cnt = pagination.max;
        if (pagination.total - start + 1 < pagination.max) {
            cnt = pagination.total - start + 1;
        }
        for (var i = 0; i < cnt; i++) {
            pg.push(start + i);
        }
        return pg;
    }
    template.helper('get_val', function(obj, p) {
        if (p in obj) {
            return obj[p];
        } else {
            return "";
        }
    });

    function token(t) {
        mod.token = t;
    }

    mod.list = function() {
        mod.render_list(last_list);
    };
    mod.db_list = function() {
        var url = "/api/query"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(search),
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            contentType: "application/json",
            success: function(res, status, xhr) {
                if (res.err == 0) {
                    mod.render_list(res);
                    hint("success");
                } else {
                    mod.bus.trigger("error", res);
                }
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };
    mod.do_list = function() {
        console.log("advance=> do list");
        console.log(search);
        mod.db_list();
        return false;
    };

    mod.render_list = function(res) {
        res._search_ = search;
        res._headers_ = [];
        if (res.data.length > 0) {
            for (p in res.data[0]) {
                res._headers_.push(p);
            }
        }
        if ('total' in res) {
            pagination.total = Math.ceil(res.total / search.limit);
        }
        pagination.pages = get_pages();
        res._pg_ = pagination;
        last_list = res;
        var html = template("advance", res);
        var main = $("#main");
        main.html(html);

        main.find('input[type="text"]').unbind('change').change(function() {
            search[this.name] = this.value;
        });
        main.find('input[name="search"]').unbind('click').click(function() {
            search.offset = 0;
            pagination.cur_pg = 1;
            mod.do_list();
            return false;
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
            search.offset = (page - 1) * search.limit;
            console.log("goto page =>" + page);
            mod.do_list();
        });

        main.find('[autofocus="autofocus"]').focus().select();
    };

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "adv.list", mod.list);
            mod.listenTo(eb, "token", token);
        }
    };
});
