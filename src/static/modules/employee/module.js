define(function() {
    var mod = [];
    _.extend(mod, Backbone.Events);


    var cond = {};
    var module_new = {};

    mod.post = function() {
    	module_new = {
    		id: "#",
    		name: "",
    		role: "",
    		mobile: "",
    		tel: "",
    		email: "",
    		position: "",
    		address: ""
    	};
    	var html = template("employee", module_new);
    	var main = $("#main");
    	main.html(html);
    	main.find('input[type="text"]').unbind('blur').blur(function(){
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