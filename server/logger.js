'use strict';

import winston from 'winston';

let log = new (winston.Logger)({
  levels: {
    debug:0,
    info: 1,
    warn: 2,
    sql:  3,
    error:4
  }
});

winston.addColors({
  debug: 'green',
  info:  'cyan',
  warn:  'yellow',
  sql:   'magenta',
  error: 'red'
});

if (process.env.NODE_ENV === 'test') {
  log.add(winston.transports.Console, {colorize: true, timestamp: true, silent: true, level: 'error'});
} else {
  log.add(winston.transports.Console, {colorize: true, timestamp: true, level: 'error'});
}

export default log;
