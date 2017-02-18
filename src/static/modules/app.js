var deps = [
    "modules/hint.js",
    "modules/header.js",
    "modules/login/module.js",
    "modules/advance/module.js",
    "modules/department/module.js",
    "modules/employee/module.js"
];

define(deps, function() {
    var ev_bus = {};
    var app = {
        token: null,
    };
    _.extend(ev_bus, Backbone.Events);
    _.extend(app, Backbone.Events);

    function token(data) {
        app.token = data;
    }

    var Router = Backbone.Router.extend({
        routes: {
            "*entity.put/:id": "do_put",
            "*actions": "do_it"
        },

        do_put: function(entity, id) {
            ev_bus.trigger(entity + ".put", id);
        },

        do_it: function(actions) {
            ev_bus.trigger("clear");
            if (null == app.token) {
                ev_bus.trigger("login");
            } else if (actions) {
                ev_bus.trigger(actions);
            }
        },
    });

    var router = new Router();
    Backbone.history.start();

    for (var i = 0; i < arguments.length; i++) {
        arguments[i].init(ev_bus);
    }
    app.listenTo(ev_bus, "token", token);

    if (null == app.token) {
        ev_bus.trigger("login");
    }
});
