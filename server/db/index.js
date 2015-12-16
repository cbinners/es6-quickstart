'use strict';

import fs from 'fs';
import path      from 'path';
import Sequelize from 'sequelize';
import config from 'config';

import cls from 'continuation-local-storage';

// Set up continuation-local-storage for easy transaction scopes.
let namespace = cls.createNamespace('foro');
Sequelize.cls = namespace;

let dbConfig = config.db.config;
dbConfig.logging = false;

let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, dbConfig);
let db = {};
db.models = [];

// Read the sequelize models
fs
.readdirSync(__dirname)
.filter((file) =>{
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach((file)=>{
  let model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
  db.models.push(model);
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
