const winston = require('winston')

const options = {
    file: {
        level: 'info',
        filename: './logs/info.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    error: {
        level: 'error',
        handleExceptions: true,
        json: true,
        colorize: true,
        filename: './logs/errors.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    },
    warn: {
        level: 'warn',
        json: true,
        filename: './logs/http.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }
};

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
        new winston.transports.File(options.error),
        new winston.transports.Http(options.warn)
    ],
    exitOnError: false
})


module.exports = logger
