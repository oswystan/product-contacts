var deps = [
    "modules/database.js",
];

define(deps, function(db) {
    var mod = {
        bus: null,
        token: null,
        db: db,
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
    var pagination = null;
    var get_pages = db.pagination.get_pages;
    _.extend(mod, Backbone.Events);

    //==========================
    // utils
    //==========================
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
    mod.do_list = function() {
        console.log("advance=> do list");
        mod.db.advance.query(search, function (data) {
            mod.render_list(data);
        });
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
        pagination.pages = get_pages.call(pagination);
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
            mod.db.init(eb);
            pagination = new db.pagination();
        },
    };
});
