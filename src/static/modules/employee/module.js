define(function() {
    var mod = {
        bus: null
    };

    var condition = function() {
        this.offset = 0;
        this.limit = 15;
        this.total = 0;
        this.type = "ID";
        this.val = "";
    }

    _.extend(mod, Backbone.Events);

    var cond = new condition();

    var last_res = {
        err: 0,
        data: [],
        _cond_: new condition()
    };

    var module_new = {};

    function module_reset(v) {
        v.id = "#";
        v.name = "";
        v.role = "";
        v.mobile = "";
        v.tel = "";
        v.mail = "";
        v.position = "";
    }

    mod.put = function(id) {
        var url = "/e/" + id;
        mod.db_get(url);
    };

    mod.post = function(id) {
        module_reset(module_new);
        var html = template("employee", module_new);
        var main = $("#main");
        main.html(html);
        main.find('input[type="text"]').unbind('blur').blur(function() {
            module_new[this.name] = this.value;
        });
        main.find('input[type="submit"]').unbind('click').click(mod.do_post);
        main.find('input[name="modify"]').unbind('click').click(mod.modify);
    };

    mod.list = function() {
        mod.render_list(last_res);
    };

    mod.db_list = function(url) {

        $.get({
            url: url,
            data: null,
            success: function(res, status, xhr) {
                mod.render_list(res);
            },
        }).fail(function(xhr, status) {
            var res = {
                err: -1,
                desc: "connection error",
            };
            mod.bus.trigger("error", res);
        });
    };

    mod.db_get = function(url) {

        $.get({
            url: url,
            data: null,
            success: function(res, status, xhr) {
                mod.render(res);
            },
        }).fail(function(xhr, status) {
            var res = {
                err: -1,
                desc: "connection error",
            };
            mod.bus.trigger("error", res);
        });
    };

    mod.render_list = function(res) {
        if (res.err == 0) {
            if (res.total) {
                cond.total = res.total;
            }
            if (!res._cond_) {
                res._cond_ = cond;
            }
            last_res = res;

            var html = template("list-employee", res);
            var main = $("#main");
            main.html(html);
            main.find('[name="key_val"]').unbind('blur').blur(function(event) {
                cond.val = this.value;
            });
            main.find('[name="search_by"]').unbind('click').click(function(event) {
                cond.type = this.value;
                main.find('[name="key_val"]').val("");
            });

            main.find(':checkbox[name="select_all"]').unbind('click').click(function(event){
                if ($(this).is(":checked")) {
                    main.find(':checkbox[name!="select_all"]').prop("checked", true);
                } else {
                    main.find(':checkbox[name!="select_all"]').prop("checked", false);
                }
            });
            main.find('[name="search"]').unbind('click').click(mod.do_list);
            main.find('[name="del"]').unbind('click').click(function(){
                var dl = [];
                main.find(':checkbox[name!="select_all"]').each(function(){
                    if($(this).is(":checked")) {
                        dl.push(this.value);
                    }
                });
                mod.do_del(dl);
            });
            
        } else {
            mod.bus.trigger("error", res);
        }
    };

    mod.render = function(res) {
        var html = template("employee", res.data[0]);
        var main = $("#main");
        main.html(html);
        main.find('input[type="text"]').unbind('blur').blur(function() {
            module_new[this.name] = this.value;
        });
        main.find('input[type="submit"]').unbind('click').click(mod.do_post);
        main.find('input[name="modify"]').unbind('click').click(mod.modify);
    };
    mod.do_list = function() {
        var url = "/e?offset=" + cond.offset + "&limit=" + cond.limit;
        if (cond.type == "name" && cond.val != "") {
            url += "&name=" + cond.val;
        } else if (cond.type == "ID" && cond.val != "") {
            url += "&id=" + cond.val;
        }

        mod.db_list(url);
    };
    mod.do_del = function(dl) {
        console.log(dl);
    };

    mod.do_post = function() {
        //TODO use ajax to interact with server
        console.log(module_new);
        return false;
    };
    mod.do_put = function() {
        return false;
    };
    mod.modify = function() {
        console.log("do modify");
        $("#main").find('input[type="text"]').removeAttr("disabled");
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