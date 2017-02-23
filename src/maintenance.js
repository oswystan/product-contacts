/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: maintenance.js
 *    description:
 *        created: 2017-02-23 17:10:13
 *         author: wystan
 *
 *********************************************************************************
 */
var unless = require('express-unless');
var maintaining = false;

function maintenance(req, res, next) {
	console.log(req._auth_.role, maintaining)
	if (req._auth_.role != 1 && maintaining) {
		res.send({err: -1, desc: "system is maintaining now!", data:[]});
	} else {
		next();
	}
}

module.exports = function () {
	maintenance.unless = unless;
	return maintenance;
};
module.exports.trigger = function(b) {
	maintaining = b;
}

/************************************* END **************************************/
