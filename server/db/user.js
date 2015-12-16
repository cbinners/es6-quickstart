'use strict';

// Some trickiness with the way sequelize does imports. We can't use ES6 exports =(
module.exports =  (sequelize, DataTypes) => {
  let name = 'User';

  let properties = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  };


  let config = {
    // Can call instance methods on any instance of User
    instanceMethods: {
      updateProperties(data) {
        for (let key of User.bulkUpdates) {
          if (data[key] !== null && data[key] !== undefined) {
            this[key] = data[key];
          }
        }
        return this.save();
      }
    },


    // These are like model serializers
    scopes: {
      filtered: {
        attributes: ['id', 'name']
      }
    },

    // These are class-level methods and attributes
    classMethods: {

      // What api route to we want to User for CRUD
      endpoint: 'user',

      bulkUpdates: [
        'name',
        'email',
        'password',
      ],

      associate: (models) => {
        // Associate models here
      }
    }
  };

  // Define the model.
  let User = sequelize.define(name, properties, config);

  return User;
};
