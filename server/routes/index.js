'use strict';
import express from 'express';
import logger from '../logger';

class Router {
  static install(app) {
    return new Promise((resolve, reject) => {
      app.use('/', (req, res, next) => {
        if (!req.path.match(/\w+\.\w+$/) && !req.path.match(/\/api/)) {
          logger.info(`[App] Serving /client/index.html for GET ${req.path}`);
          req.url = '/client/index.html';
        }
        next();
      });

      app.use('/client', express.static('public/client'));

      resolve();
    });
  }
}

export default Router;
