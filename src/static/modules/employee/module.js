define(function() {
    var mod = [];
    _.extend(mod, Backbone.Events);

    var cond = {};
    var module_new = {};
    var module = {};

    function module_reset(v) {
        v.id = "#";
        v.name = "";
        v.role = "";
        v.mobile = "";
        v.tel = "";
        v.email = "";
        v.position = "";
        v.address = "";
        v.id = "1";
        v.name = "wystan";
        v.role = "swe";
        v.mobile = "19088776666";
        v.tel = "30394847";
        v.email = "xxx@12.com";
        v.position = "#49-3-102";
        v.address = "China, BJ, HAIDIAN.";
    }

    mod.put = function() {
        module_reset(module_new);
        var html = template("employee", module_new);
        var main = $("#main");
        main.html(html);
        main.find('input[type="text"]').unbind('blur').blur(function() {
            module_new[this.name] = this.value;
        });
        main.find('input[type="submit"]').unbind('click').click(mod.do_post);
        main.find('input[name="modify"]').unbind('click').click(mod.modify);
        $("#main").find('input[type="text"]').removeAttr("disabled");
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
        var html = template("list-employee");
        var main = $("#main");
        main.html(html);
        main.find('[name="key_val"]').unbind('blur').blur(function(event) {
            cond.val = this.value;
        });
        main.find('[name="search_by"]').unbind('click').click(function(event) {
            cond.type = this.value;
        });
        main.find('[name="search"]').unbind('click').click(mod.do_list);

        cond.type = "ID";
        cond.val = "";
    };

    mod.do_list = function() {
        console.log(cond);
    };
    mod.do_post = function() {
        //TODO use ajax to interact with server
        console.log(module_new);
        return false;
    };
    mod.do_put = function() {
        console.log(module_new);
        return false;
    };
    mod.modify = function() {
        console.log("do modify");
        $("#main").find('input[type="text"]').removeAttr("disabled");
    };

    return {
        init: function(eb) {
            mod.listenTo(eb, "employee.list", mod.list);
            mod.listenTo(eb, "employee.post", mod.post);
        }
    };
});