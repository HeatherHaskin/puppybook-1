'use strict'

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/puppies');

var Puppy = db.define('puppy', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 20
    }
  },
  favFood: {
    type: Sequelize.STRING,
  },
}, {
    getterMethods: {
      fullName: function() {
        return this.firstName + " " + this.lastName;
      },
    },
    instanceMethods: {
      greet: function() {
        return "Woof, woof! I'm " + this.fullName;
      }
    },
    classMethods: {
      findByFavFood: function(food) {
        return this.findAll({
          where: {
            favFood: food
          }
        })
      },
      count: function() {
        this.findAll()
        .then(function(puppies) {
          return puppies.length;
        })
      }
    },
    hooks: {
      beforeValidate: function(puppy) {
        if (puppy.favFood === 'pizza') {
          puppy.favFood = 'chicken and rice';
        }
      }
    }
  });

var Park = db.define('park', {
  name: {
    type: Sequelize.STRING
  }
});

Puppy.belongsTo(Park, {as: 'favPark'});

module.exports = {
  Puppy: Puppy,
  Park: Park,
  db: db
};
