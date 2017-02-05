define(function() {
	var mod = {
        bus: null,
    };
    var last_list = {
        data: [],
    };
    var search = {
        fields:"",
        tab: "",
        where: "",
        orderby: "",
        offset: 0,
        limit: 15,
    };
    _.extend(mod, Backbone.Events);

    //==========================
    // utils
    //==========================
    template.helper('get_val', function (obj, p) {
        if (p in obj) {
            return obj[p];
        } else {
            return "";
        }
    });

    mod.list = function() {
        mod.render_list(last_list);
    };
    mod.db_list = function() {
        var url = "/query"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(search),
            contentType: "application/json",
            success: function(res, status, xhr) {
                console.log(res);
                if (res.data.length > 0) {
                    mod.render_list(res);
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
            for(p in res.data[0]) {
                res._headers_.push(p);
            }
        }
        var html = template("advance", res);
        var main = $("#main");
        main.html(html);

        main.find('input[type="text"]').unbind('blur').blur(function(){
            search[this.name] = this.value;
        });
        main.find('input[name="search"]').unbind('click').click(function(){
            mod.do_list();
        });
    };

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "adv.list", mod.list);
        }
    };
});