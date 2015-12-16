'use strict';

import Router from './routes';
import DB from './db';
import config from 'config';
import logger from './logger';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import http from 'http';

let allowCrossDomain = (req, res, next) => {
  // For now, allow any origin.
  let origin = req.get('Origin');
  res.header(
    'Access-Control-Allow-Origin',
    origin
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

class Server {
  start(path, done) {
    logger.info('Starting the server');
    let app = express();
    let cb = (err) => {
      if (err) {
        logger.error(err);
        if (done !== null && typeof done === 'function') {
          done(err);
        }
      } else {
        if (done !== null && typeof done === 'function') {
          done(err);
        }
      }
    };
    app.use(allowCrossDomain);
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
      secret: 'CHANGEME',
      resave: false,
      saveUninitialized: false
    }));
    Router.install(app).then(()=>{
      logger.info('Routes installed.');
      DB.sequelize.sync().then(()=>{
        logger.info('Database synchronized.');
        let server = http.Server(app);
        server.listen(config.server.port, (err) => {
          if (err) {
            return cb(new Error(err));
          } else {
            logger.info(`Started server on port ${config.server.port}`);
            cb();
          }
        });
      }).catch((err) =>{
        cb(err);
      });
    });
  }
}

module.exports = Server;
