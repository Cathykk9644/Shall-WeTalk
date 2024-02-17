'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      planType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      signUpType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageURL: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userAddress: {
        allowNull: false,
        type: Sequelize.STRING,
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

    // Add a custom constraint to allow password to be null if signUpType is "thirdParty"
    await queryInterface.sequelize.query(`
      ALTER TABLE users ADD CONSTRAINT check_password_based_on_sign_up_type CHECK (
        (
          'signUpType' = 'thirdParty' AND password IS NULL) OR
        ('signUpType' <> 'thirdParty' AND password IS NOT NULL)
      );
    `);
    // start table entries from id 6 to avoid an error
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE users_id_seq RESTART WITH 6'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
