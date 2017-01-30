var deps = [
    "modules/login/module.js",
    "modules/advance/module.js",
    "modules/department/module.js",
    "modules/employee/module.js"
];

define(deps, function() {
    var ev_bus = {};
    _.extend(ev_bus, Backbone.Events);

    var Router = Backbone.Router.extend({
        routes: {
            "*actions": "do_it"
        },

        do_it: function (actions) {
        	if (actions) {
        		console.log("do " + actions);
        		ev_bus.trigger(actions);
        	} else {
        		console.log("do login");
        		ev_bus.trigger("login");
        	}
        },
    });

    var router = new Router();
    Backbone.history.start();

    for (var i = 0; i < arguments.length; i++) {
        arguments[i].init(ev_bus);
    }

    ev_bus.trigger("login");
});