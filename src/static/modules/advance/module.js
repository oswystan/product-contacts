define(function() {
	var mod = {};
    var last_list = {};
    var search = {
        fields:"",
        tab: "",
        where: "",
        orderby: "",
        offset: 0,
        limit: 15,
    };
    _.extend(mod, Backbone.Events);

    mod.db_list = function() {
        var url = "/query"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(search),
            contentType: "application/json",
            success: function(res, status, xhr) {
                console.log(res);
                mod.render_list(res);
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
    };

    mod.list = function() {
    	mod.render_list(last_list);
    };
    mod.do_list = function() {
        console.log("advance=> do list");
        console.log(search);
        mod.db_list();
        return false;
    };

    mod.render_list = function(res) {
        res._search_ = search;
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
            mod.listenTo(eb, "adv.list", mod.list);
        }
    };
});