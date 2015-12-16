'use strict';

// Shim fixing IE
if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import router from './src/router';

let dom = document.createElement('div');
document.body.appendChild(dom);

$(()=>{
  Router.run(router, Router.HistoryLocation, (Handler) =>{
    ReactDOM.render(<Handler />, dom);
  });
});
