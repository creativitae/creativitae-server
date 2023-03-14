'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerTemplates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      TemplateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Templates',
          key: 'id'
        }
      },
      cvImage: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CustomerTemplates');
  }
};