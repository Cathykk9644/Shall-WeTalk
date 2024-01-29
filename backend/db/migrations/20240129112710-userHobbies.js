'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userHobbies', {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: Sequelize.INTEGER,
      },

      userId: {
        allowNull: false,

        type: Sequelize.INTEGER,

        references: {
          model: 'users',

          key: 'id',
        },
      },

      hobbyId: {
        allowNull: false,

        type: Sequelize.INTEGER,

        references: {
          model: 'hobbies',

          key: 'id',
        },
      },

      createdAt: {
        allowNull: false,

        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,

        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userHobbies');
  },
};
