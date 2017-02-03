var deps = [
    "modules/login/module.js",
    "modules/advance/module.js",
    "modules/department/module.js",
    "modules/employee/module.js"
];

define(deps, function() {
    var ev_bus = {};
    var app = {};
    _.extend(ev_bus, Backbone.Events);
    _.extend(app, Backbone.Events);

    app.render_error = function(res) {
        console.log(res);
    };

    var Router = Backbone.Router.extend({
        routes: {
            "*entity.put/:id":"do_put",
            "*actions": "do_it"
        },

        do_put: function(entity, id) {
            ev_bus.trigger(entity+".put", id);
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
    app.listenTo(ev_bus, "error", app.render_error);
});