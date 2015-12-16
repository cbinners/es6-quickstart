'use strict';
import Main from './routes/main';
import React from 'react';
import Router from 'react-router';
const { Route } = Router;

export default (
  <Route path="/" handler={Main} />
);
