define(function() {
	var mod = [];
    _.extend(mod, Backbone.Events);


    mod.list = function() {
    	var html = template("advance");
    	var main = $("#main");
    	main.html(html);
    };

    return {
        init: function(eb) {
            mod.listenTo(eb, "adv.list", mod.list);
        }
    };
});