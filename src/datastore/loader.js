/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: loader.js
 *    description:
 *        created: 2017-03-02 18:03:06
 *         author: wystan
 *
 *********************************************************************************
 */

var EventEmitter = require('events').EventEmitter;
var async = require('async');
var inherits = require('util').inherits;
var cfg = require("../config")();
var logger = require("../log");

var log = null;
var loader = module.exports = function (cli, f, tab) {
	this.cli = cli;
	this.file = f;
	this.tab = tab;
	log = logger.log();
};
inherits(loader, EventEmitter);

var tabs = {};
var employees = {};
employees.load = function(cli, f, callback) {
	callback({message: "NOT implemented yet, pls try later."}, null);
};

var departments = {};
departments.load = function(cli, f, callback) {
	var now = new Date();
	var bk_file = cfg.upload.path + "/departments_backup" + ".csv";
	var sql_load = [
		"copy departments to '" + bk_file + "' csv header delimiter ',';",
		"alter table departments disable trigger all;",
		"copy departments from '" + f + "' csv header delimiter ',';",
		"alter table departments enable trigger all;",
	];

	var sql_rollback = [
		"delete from departments;",
		"alter table departments disable trigger all;",
		"copy departments from '" + bk_file + "' csv header delimiter ',';",
		"alter table departments enable trigger all;",
	];

	var sql_update_seq = [
		"select max(id) as max_id from departments",
		"select setval('departments_id_seq', %d)",
	];

	function do_rollback() {
		log.warn("do rollback");
		async.eachSeries(sql_rollback, function(sql, cb) {
			log.debug(sql);
			cli.query(sql, function(err, result) {
				cb(err, result);
			});
		}, function(err, result) {
			if (err) {
				log.error(err.message);
			} else {
				log.warn("rollback done.");
			}
		});
	};
	function do_update_seq() {
		log.debug("do update sequence");
		var max_id = 0;
		async.series([
			function(cb) {
				cli.query("select max(id) as max_id from departments", function(err, result){
					if (!err) {
						max_id = result.rows[0].max_id;
					}
					cb(err);
				});
			},
			function(cb) {
				cli.query("select setval('departments_id_seq', " + max_id + ");", function(err, result){
					cb(err, null);
				});
			},
		],
	    function(err, result) {
			callback(err, null);
		});
	}

	function do_load() {
		async.eachSeries(sql_load, function(sql, cb) {
			log.debug(sql);
			cli.query(sql, function(err, result) {
				cb(err, result);
			});
		}, function(err, result) {
			if (err) {
				do_rollback();
				callback(err, null);
			} else {
				do_update_seq();
			}
		});
	};
	do_load();
	//backup data
	//disable trigger
	//load data
	//enable trigger
	//get max id
	//update sequence
	//remove backup data
};

tabs.employees = employees;
tabs.departments = departments;

loader.prototype.load = function() {
	var self = this;
	if (this.tab in tabs) {
		var tab = tabs[this.tab];
		tab.load(this.cli, this.file, function(err, result) {
			if (err) {
				self.emit("error", err);
			} else {
				self.emit("done", result);
			}
		});
	} else {
		self.emit("error", {message: "no such table " + self.tab});
	}
};


/************************************* END **************************************/
