'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Template)
    }
  }
  Admin.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Admin name is required"
        },
        notEmpty: {
          msg: 'Admin name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Please insert unique e-mail'
      },
      validate: {
        notNull: {
          msg: "Admin email is required"
        },
        notEmpty: {
          msg: 'Admin email is required'
        },
        isEmail: {
          msg: 'Please insert e-mail format'
        } 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Admin password is required"
        },
        notEmpty: {
          msg: 'Admin password is required'
        },
        len: {
          args: [5, 100],
          msg: 'Password be at least 5 characters long'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Admin phone number is required"
        },
        notEmpty: {
          msg: 'Admin phone number is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Admin address is required"
        },
        notEmpty: {
          msg: 'Admin address is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate(admin => {
    admin.password = hash(admin.password)
  })
  return Admin;
};