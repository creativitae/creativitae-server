'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDetailTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerDetailTemplate.belongsTo(models.Template)
      CustomerDetailTemplate.belongsTo(models.CustomerDetail)
    }
  }
  CustomerDetailTemplate.init({
    CustomerDetailId: DataTypes.INTEGER,
    TemplateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CustomerDetailTemplate',
  });
  return CustomerDetailTemplate;
};