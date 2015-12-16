'use strict';

global.Promise = require('bluebird');

require('babel-core/register');
var Server = require('./server.js');
var server = new Server();
server.start();
