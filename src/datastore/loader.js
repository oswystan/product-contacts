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
var inherits = require('util').inherits;
var cfg = require("./config")();

var loader = function (cli, f, tab) {
	this.cli = cli;
	this.file = f;
	this.tab = tab;
};
inherits(loader, EventEmitter);

var tabs = {};
var employee = {};
employee.load = function(cli, f, callback) {
};

var department = {};
department.load = function(cli, f, callback) {
	//backup data
	//disable trigger
	//load data
	//enable trigger
	//get max id
	//update sequence
	//remove backup data
};

tabs.employee = employee;
tabs.department = department;

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
		self.emit("error", {message: "no such table" + self.tab});
	}
};


/************************************* END **************************************/
