define(function() {
    var mod = [];
    _.extend(mod, Backbone.Events);

    mod.post = function() {
    	var html = template("department");
    	var main = $("#main");
    	main.html(html);
    };

    mod.list = function() {
        var html = template("list-department");
        var main = $("#main");
        main.html(html);
    };


    return {
        init: function(eb) {
            mod.listenTo(eb, "department.list", mod.list);
            mod.listenTo(eb, "department.post", mod.post);
        }
    };
});