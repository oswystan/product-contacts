define(function() {
    var mod = {
        bus: null,
    };
    _.extend(mod, Backbone.Events);

    var model = {
        username: "",
        password: ""
    };

    function ajax_fail() {
        var res = {
            err: -1,
            desc: "pls check the network !",
        };
        mod.bus.trigger("error", res);
    };

    function hint(s) {
        mod.bus.trigger("hint", s);
    }

    mod.change = function() {
        model[this.name] = this.value;
    };
    mod.do_post = function() {
        var url = "/api/auth";
        $.post({
            url: url,
            data: JSON.stringify(model),
            contentType: "application/json",
            success: function(res, status, xhr) {
                if (res.err == 0) {
                    mod.render(true);
                    hint("success");
                    mod.bus.trigger('token', res.data);
                } else {
                    mod.render(false);
                    mod.bus.trigger('error', res);
                }
            },
        }).fail(function(xhr, status) {
            ajax_fail();
        });
        return false;
    };

    mod.post = function() {
        mod.render(false);
    };

    mod.render = function(clear) {
        var main = $('#main');
        if (clear) {
            main.html("");
            return;
        }

        var html = template("login");
        main.html(html);

        main.find("[name='username']").unbind('change').change(mod.change);
        main.find("[name='password']").unbind('change').change(mod.change);
        main.find("[name='submit']").unbind('click').click(mod.do_post);
        main.find('[autofocus="autofocus"]').focus().select();
    };

    return {
        init: function(eb) {
            mod.listenTo(eb, "login", mod.post);
            mod.bus = eb;
        }
    };
});
