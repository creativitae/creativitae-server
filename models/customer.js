'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.CustomerTemplate)
      Customer.hasMany(models.CustomerDetail)
      Customer.hasMany(models.Receipt)
    }
  }
  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Customer name is required"
        },
        notEmpty: {
          msg: 'Customer name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Please insert unique e-mail"
      },
      validate: {
        notNull: {
          msg: "Customer e-mail is required"
        },
        notEmpty: {
          msg: 'Customer e-mail is required'
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
          msg: "Customer password is required"
        },
        notEmpty: {
          msg: 'Customer password is required'
        },
        len: {
          args: [5, 100],
          msg: 'Password be at least 5 characters long'
        }
      }
    },
    isPremium: DataTypes.BOOLEAN,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Customer phone number is required"
        },
        notEmpty: {
          msg: 'Customer phone number is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Customer address is required"
        },
        notEmpty: {
          msg: 'Customer address is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate(customer => {
    customer.password = hash(customer.password)
  })
  return Customer;
};