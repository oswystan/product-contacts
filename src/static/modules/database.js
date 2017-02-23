/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: database.js
 *    description:
 *        created: 2017-02-19 10:12:48
 *         author: wystan
 *
 *********************************************************************************
 */

define(function() {
    var mod = {
        bus: null,
        token: null,
    };
    _.extend(mod, Backbone.Events);

    var employees = {};
    var departments = {};
    var advance = {};
    var upload = {};

    //==========================================
    // utils
    //==========================================
    function ajax_fail(status, desc) {
        var res = {
            err: -1,
            desc: status == 0 ? "network error" : desc
        };
        if (status == 401) {
            mod.bus.trigger("login");
        } else {
            mod.bus.trigger("error", res);
        }
    }

    function hint(s) {
        mod.bus.trigger("hint", s);
    }

    function token(t) {
        mod.token = t;
    }

    //==========================================
    // back-end utils
    //==========================================
    function db_list(base, query, succ_cb) {
        var url = base + "?" + query;
        $.get({
            url: url,
            data: null,
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            success: function(res, status, xhr) {
                if (res.err == 0) {
                    succ_cb(res);
                    hint('get list success.');
                } else {
                    ajax_fail(res.err, res.desc);
                }
            },
        }).fail(function(xhr, status, err) {
            ajax_fail(xhr.status, err);
        });
    };
    function db_get(base, id, succ_cb) {
        var url = base + "/" + id;
        $.get({
            url: url,
            data: null,
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            success: function(res, status, xhr) {
                if (res.err == 0 && res.data.length > 0) {
                    succ_cb(res);
                    hint('get detail success');
                } else {
                    ajax_fail(res.err, res.desc);
                }
            },
        }).fail(function(xhr, status, err) {
            ajax_fail(xhr.status, err);
        });
    };
    function db_post(base, data, succ_cb) {
        var url = base;
        $.post({
            url: url,
            data: JSON.stringify(data),
            contentType: "Application/json",
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            success: function(res, status, xhr) {
                if (res.err == 0 && res.data.length > 0) {
                    succ_cb(res);
                    hint('success');
                } else {
                    ajax_fail(res.err, res.desc);
                }
            },
        }).fail(function(xhr, status, err) {
            ajax_fail(xhr.status, err);
        });
    };
    function db_put(base, data, succ_cb) {
        var url = base;
        $.ajax({
            url: url,
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            success: function(res, status, xhr) {
                if (res.err == 0 && res.data.length > 0) {
                    succ_cb(res);
                    hint("update record success");
                } else {
                    ajax_fail(res.err, res.desc);
                }
            },
        }).fail(function(xhr, status, err) {
            ajax_fail(xhr.status, err);
        });
    };
    function db_del(base, data, succ_cb) {
        var url = base;
        var dl = [];
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: url,
                type: "DELETE",
                async: false,
                data: JSON.stringify({
                    "id": data[i]
                }),
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + mod.token,
                },
                success: function(res, status, xhr) {
                    if (res.err == 0 && res.data.length > 0) {
                        dl.push(res.data[0].id);
                    } else {
                        ajax_fail(res.err, res.desc);
                    }
                },
            }).fail(function(xhr, status, err) {
                ajax_fail(xhr.status, err);
            });
        }

        if (dl.length > 0) {
            hint("total " + dl.length + " records deleted.");
            succ_cb();
        }
    };
    function db_upload(base, data, succ_cb) {
        var url = base;
        $.post({
            url: url,
            data: data,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": "Bearer " + mod.token,
            },
            success: function(res, status, xhr) {
                if (res.err == 0 && res.data.length > 0) {
                    succ_cb(res);
                    hint('upload success');
                } else {
                    ajax_fail(res.err, res.desc);
                }
            },
        }).fail(function(xhr, status, err) {
            ajax_fail(xhr.status, err);
        });
    };
    //==========================================
    // employees back-end interaction
    //==========================================
    employees.list = function(query, succ_cb) {
        db_list("/api/e", query, succ_cb);
    };
    employees.get = function(id, succ_cb) {
        db_get("/api/e", id, succ_cb);
    };
    employees.post = function(data, succ_cb) {
        db_post("/api/e", data, succ_cb);
    };
    employees.put = function(data, succ_cb) {
        db_put("/api/e", data, succ_cb);
    };
    employees.del = function(data, succ_cb) {
        db_del("/api/e", data, succ_cb);
    };

    //==========================================
    // departments back-end interaction
    //==========================================
    departments.list = function(query, succ_cb) {
        db_list("/api/d", query, succ_cb);
    };
    departments.get = function(id, succ_cb) {
        db_get("/api/d", id, succ_cb);
    };
    departments.post = function(data, succ_cb) {
        db_post("/api/d", data, succ_cb);
    };
    departments.put = function(data, succ_cb) {
        db_put("/api/d", data, succ_cb);
    };
    departments.del = function(data, succ_cb) {
        db_del("/api/d", data, succ_cb);
    };

    //==========================================
    // advance query back-end interaction
    //==========================================
    advance.query = function(data, succ_cb) {
        db_post("/api/query", data, succ_cb);
    };

    //==========================================
    // upload data file into database
    //==========================================
    upload.post = function(data, succ_cb) {
        db_upload("/api/upload", data, succ_cb);
    }

    //==========================================
    // pagation
    //==========================================
    function pagination() {
        this.total = 0;
        this.offset = 0;
        this.limit = 10;
        this.cur_pg = 1;
        this.pages = [];
        this.max = 5;
    }
    pagination.get_pages = function() {
        var pg = [];
        var half = Math.floor(this.max / 2);
        var start = 1;
        if (this.cur_pg - half > 0) {
            start = this.cur_pg - half;
        }

        var cnt = this.max;
        if (this.total - start + 1 < this.max) {
            cnt = this.total - start + 1;
        }
        for (var i = 0; i < cnt; i++) {
            pg.push(start + i);
        }
        return pg;
    }

    return {
        init: function(eb) {
            mod.bus = eb;
            mod.listenTo(eb, "token", token);
            console.log("database init.");
        },
        employees: employees,
        departments: departments,
        advance: advance,
        pagination: pagination,
        upload: upload,
    };
});



/************************************* END **************************************/