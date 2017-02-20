define(function() {
    var mod = {};
    _.extend(mod, Backbone.Events);

    function render(err) {
        var html = template("hints", err);
        var bar = $("#hint_bar");
        if (err.err != 0) {
            bar.attr("error", true);
        } else {
            bar.removeAttr('error');
        }
        bar.html(html);
    }

    function clear() {
        var err = {
            err: 0,
            desc: ""
        };
        render(err);
    }

    function hint(str) {
        var err = {
            err: 0,
            desc: str
        };
        render(err);
    }

    return {
        init: function(eb) {
            console.log("init hint");
            mod.listenTo(eb, "error", render);
            mod.listenTo(eb, "clear", clear);
            mod.listenTo(eb, "hint", hint);
        },
    };
});
