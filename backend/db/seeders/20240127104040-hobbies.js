'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const hobbiesData = require(path.join(
      __dirname,
      '/seeder_jsons/hobbies.json'
    )).hobbies;

    const hobbies = hobbiesData.map((hobby) => ({
      ...hobby,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('hobbies', hobbies, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('hobbies', null, {});
  },
};
