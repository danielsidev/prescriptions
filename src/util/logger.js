const winston = require('winston');
const appRoot = require('app-root-path');
var options = {
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/logs/info_json.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    timestamp: true,
    colorize: false,
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/logs/error_json.log`,
    handleExceptions: true,
    json: true,
    timestamp: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    timestamp: true,
    colorize: true,
  },
};
const loggerInfo = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  timestamp: true,
  prettyPrint:(object) => { return JSON.stringify(object);},
  transports: [
    new winston.transports.File(options.fileInfo),
    new winston.transports.Console(options.console)
  ]
});
const loggerError = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  timestamp: true,
  prettyPrint:(object) => { return JSON.stringify(object);},
  transports: [
    new winston.transports.File(options.fileError),
    new winston.transports.Console(options.console)
  ]
});  
const successLogger = (label, message) => {
        loggerInfo.log({
            level: 'info',
            label: label,
            message: message
        });
    };

const errorLogger = (label, message) => {
        loggerError.log({
            level: 'error',
            label:label,
            message: message
        });
    };

module.exports = {
  'successlog': successLogger,
  'errorlog': errorLogger
};