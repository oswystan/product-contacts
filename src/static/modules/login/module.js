define(function() {
    var mod = [];
    _.extend(mod, Backbone.Events);

    var model = {
        username: "",
        password: ""
    };

    mod.change = function() {
        model[this.name] = this.value;
    };
    mod.do_post = function() {
        console.dir(model);
        return false;
    };

    mod.post = function() {
        var html = template("login");
        var main = $('#main');
        main.html(html);

        main.find("[name='username']").unbind('blur').blur(mod.change);
        main.find("[name='password']").unbind('blur').blur(mod.change);
        main.find("[name='submit']").unbind('click').click(mod.do_post);
    };

    return {
        init: function(eb) {
            mod.listenTo(eb, "login", mod.post);
        }
    };
});