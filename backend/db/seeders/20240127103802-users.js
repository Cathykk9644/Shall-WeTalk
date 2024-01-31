'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const usersData = require(path.join(
      __dirname,
      '/seeder_jsons/users.json'
    )).users;
    const users = usersData.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
