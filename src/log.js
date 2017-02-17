/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: log.js
 *    description:
 *        created: 2017-02-09 11:43:35
 *         author: wystan
 *
 *********************************************************************************
 */
var fs = require('fs');
var process = require('process');
var log4js = require('log4js');

var logger = null;
var exp = null;
var log_opts = {
    evel: 'auto',
    format: ':remote-addr :response-time :status :method :url',
    nolog: '\\.gif|\\.jpg|\\.js$'
};

module.exports = {
    init: function() {
        var dir = __dirname + "/../logs";
        try {
            fs.accessSync(dir);
        } catch (e) {
            fs.mkdirSync(dir);
        }
        log4js.configure({
            appenders: [{
                type: 'file',
                filename: 'logs/contacts.log',
                category: 'contacts',
                maxLogSize: 1 * 1024 * 1024,
                backups: 10
            }]
        });
        var level = 'INFO';
        if (process.env.NODE_ENV === "development") {
            level = 'DEBUG';
            log4js.loadAppender('console');
            log4js.addAppender(log4js.appenders.console());
        }
        logger = log4js.getLogger("contacts");
        logger.setLevel(level);

        return;
    },
    express: function() {
        return log4js.connectLogger(logger, log_opts);
    },
    log: function() {
        return logger;
    }
};

/************************************* END **************************************/
