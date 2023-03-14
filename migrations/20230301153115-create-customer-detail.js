'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT
      },
      educations: {
        type: Sequelize.TEXT
      },
      workExperiences: {
        type: Sequelize.TEXT
      },
      languages: {
        type: Sequelize.TEXT
      },
      skills: {
        type: Sequelize.TEXT
      },
      certifications: {
        type: Sequelize.TEXT
      },
      portfolios: {
        type: Sequelize.TEXT
      },
      socialMedias: {
        type: Sequelize.TEXT
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CustomerDetails');
  }
};