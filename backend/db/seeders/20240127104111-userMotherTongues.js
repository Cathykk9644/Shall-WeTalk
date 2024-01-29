'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const userMotherTonguesData = require(path.join(
      __dirname,
      '/seeder_jsons/user_mother_tongues.json'
    )).user_mother_tongues;
    const userMotherTongues = userMotherTonguesData.map((userMotherTongue) => ({
      ...userMotherTongue,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('userMotherTongues', userMotherTongues, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('userMotherTongues', null, {});
  },
};
