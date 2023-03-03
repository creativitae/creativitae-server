'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerTemplate.belongsTo(models.Customer)
      CustomerTemplate.belongsTo(models.Template)
    }
  }
  CustomerTemplate.init({
    CustomerId: DataTypes.INTEGER,
    TemplateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CustomerTemplate',
  });
  return CustomerTemplate;
};