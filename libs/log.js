/**
 * Created by MrHant on 06.10.2015.
 */
var winston = require('winston');
var ENV = process.env.NODE_ENV;
//debugger;
function getLogger(module) {
    var path = module.filename.split('\\').slice(-2).join('\\');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;