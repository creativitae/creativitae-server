'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Template.belongsTo(models.Admin)
      Template.hasMany(models.CustomerTemplate)
      Template.hasMany(models.CustomerDetailTemplate)
    }
  }
  Template.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    isPremium: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    AdminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};