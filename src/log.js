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
var log4js = require('log4js');

var logger = null;
var exp = null;
var log_opts = {
    evel: 'auto',
    format: ':remote-addr :response-time :status :method :url',
    nolog: '\\.gif|\\.jpg|\\.js$'
};

module.exports = {
    init: function () {
        var dir = __dirname + "/../logs";
        try {
            fs.accessSync(dir);
        } catch (e){
            fs.mkdirSync(dir);
        }
        log4js.configure({
            appenders:[
                {
                    type: 'console'
                },
                {
                    type: 'file',
                    filename: 'logs/contacts.log',
                    category: 'contacts',
                    maxLogSize: 1*1024*1024,
                    backups: 10
                }
            ]
        });
        logger = log4js.getLogger("contacts");

        return;
    },
    express: function () {
        return log4js.connectLogger(logger, log_opts);
    },
    log: function () {
        return logger;
    }
};

/************************************* END **************************************/

