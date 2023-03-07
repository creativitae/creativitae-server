'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerDetail.belongsTo(models.Customer)
      CustomerDetail.hasMany(models.CustomerDetailTemplate)
    }
  }
  CustomerDetail.init({
    fullName: DataTypes.STRING,
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    educations: DataTypes.TEXT,
    workExperiences: DataTypes.TEXT,
    languages: DataTypes.TEXT,
    skills: DataTypes.TEXT,
    certifications: DataTypes.TEXT,
    portfolios: DataTypes.TEXT,
    socialMedias: DataTypes.TEXT,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CustomerDetail',
  });
  return CustomerDetail;
};